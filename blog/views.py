from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Post
from .serializers import UserSerializer, PostSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username and password:
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
    
    return Response(
        {'error': 'Неверные учетные данные'}, 
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['GET'])
def user_profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()

    def perform_update(self, serializer):
        # Проверяем, что пользователь может редактировать только свои посты
        if serializer.instance.author != self.request.user:
            return Response(
                {'error': 'Вы можете редактировать только свои посты'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()

    def perform_destroy(self, instance):
        # Проверяем, что пользователь может удалять только свои посты
        if instance.author != self.request.user:
            return Response(
                {'error': 'Вы можете удалять только свои посты'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        instance.delete()


@api_view(['GET'])
def user_posts(request):
    """Получить посты текущего пользователя"""
    posts = Post.objects.filter(author=request.user)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data) 