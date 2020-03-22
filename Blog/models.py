from django.db import models


# Create your models here.
class article(models.Model):
    nid = models.AutoField(primary_key=True)
    main_title = models.CharField(max_length=50, verbose_name='main_title', editable=True)
    sub_title = models.CharField(max_length=50, verbose_name='sub_title', editable=True)
    # email = models.EmailField(db_index=True)
    content = models.TextField()
    # img = models.ImageField(upload_to='static/upload')
    article_type_choices = (
        (0, "Python"),
        (1, "JavaScript"),
        (2, "SQL"),
    )
    article_type = models.IntegerField(choices=article_type_choices, default=0)

    def __str__(self):
        return self.main_title
