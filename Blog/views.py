import os

from django.contrib import messages
from django.core.mail import send_mail
from django.core.paginator import Paginator
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.template import loader
from django.views.decorators.clickjacking import xframe_options_exempt
import Blog.financialanalysis as fa
from Blog import models


def index(request):
    return render(request, 'index.html')


def introduction(request):
    if request.method == "GET":
        return render(request, 'introduction.html')
    elif request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        if name and email and message:
            request.session['name'] = name
            request.session['email'] = email
            request.session['message'] = message
            return redirect('/submit/')
        else:
            return render(request, 'introduction.html')


def submit(request):
    name = request.session['name']
    email = request.session['email']
    message = request.session['message']
    res = send_mail(subject='Contact By My website: ' + name + '<' + email + '>',
                    message='Name:' + str(name) + '\n' + 'Email:' + str(email) + '\n' + 'Message:' + str(message),
                    from_email='ervinzhang319@gmail.com', recipient_list=['ervinzhang319@gmail.com'],
                    fail_silently=False)
    if res == 1:
        statusmessage = "Succeed!"
        messages.success(request, statusmessage)
    else:
        statusmessage = "Oops! Something wrong with internet or other reasons"
    t = loader.get_template('submit.html')
    return HttpResponse(t.render({'status': statusmessage, 'name': name, 'email': email, 'message': message}))


def spa(request):
    return render(request, 'superHTML.html')


def fullstack(request):
    return render(request, 'fullstack.html')


@xframe_options_exempt
def pfas(request):
    localtime = fa.gettime()
    pwd = os.path.dirname(os.path.dirname(__file__))
    today_file = pwd + '/static/pfas/img/' + localtime + '.png'
    if not os.path.exists(today_file):
        status = fa.gethistorydata()
    goldpricedate, currentdata = fa.getcurrentdata()
    return render(request, 'pfas.html',
                  {'localtime': localtime, 'goldpricedate': goldpricedate, 'currentdata': currentdata})


def excel(request):
    return render(request, 'spreadsheet_v2.html')


def article(request, pid):
    if request.method == 'GET':
        article_list = models.article.objects.get_queryset().order_by('nid')
        # return render(request, 'article.html', {'article': article_list})
        pag = Paginator(article_list, 1)
        page = pag.page(int(pid))
        return render(request, template_name='article.html', context={'page': page, 'all': article_list})


def product(request):
    return render(request, 'productmanager.html')


# def media(request):
#     from bilibili_api import video
#     aid_list = [22382268, 24068564, 24710310]
#     dict_all = {}
#     i = 0
#     for aid in aid_list:
#         dict_single = {}
#         my_video = video.VideoInfo(aid=aid)
#         data = my_video.get_video_info()
#         pic = data['pic']
#         title = data['title']
#         duration = round(data['duration'] / 60, 2)
#         play = 'https://www.bilibili.com/video/av' + str(aid)
#         dict_single['pic'] = pic
#         dict_single['title'] = title
#         dict_single['duration'] = duration
#         dict_single['play'] = play
#         dict_all[i] = dict_single
#         i += 1
#     return render(request, template_name='media.html', context={"dict_all": dict_all})

