from django.contrib import admin

# Username:SA
# Password:SA
# Register your models here.
from Blog import models


class articleAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['main_title']}),
        (None, {'fields': ['sub_title']}),
        (None, {'fields': ['article_type']}),
        (None, {'fields': ['content']}),
    ]
    list_display = ('article_type', 'main_title', 'sub_title', 'content')  # add more columns.
    list_filter = ['main_title']  # add filter function.
    search_fields = ['main_title']  # add search function.


admin.site.register(models.article, articleAdmin)
