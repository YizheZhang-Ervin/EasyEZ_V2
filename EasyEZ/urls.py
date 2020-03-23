"""EasyEZ URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('Blog/', include('Blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views import static

from Blog import views
from EasyEZ import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path("submit/", views.submit),
    path('introduction/', views.introduction),
    path('fullstack/', views.fullstack),
    path('spa/', views.spa),
    path('excel/', views.excel),
    path('pfas/', views.pfas),
    re_path(r'article/(?P<pid>\d+)/$', views.article),
    re_path(r'media/$', views.media),
    path('index/', views.index),
    path('', views.index),
]


if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^static/(?P<path>.*)$', static.serve, {'document_root': settings.STATIC_ROOT}),
    ]