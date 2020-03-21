from django.contrib import admin

# Username:SA
# Password:SA
# Register your models here.
from Blog import models


class articleAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['title']}),
        (None, {'fields': ['article_type']}),
        (None, {'fields': ['content']}),
        (None, {'fields': ['img']}),
    ]
    list_display = ('title', 'article_type', 'content', 'img')  # add more columns.
    list_filter = ['title']  # add filter function.
    search_fields = ['title']  # add search function.


admin.site.register(models.article, articleAdmin)
