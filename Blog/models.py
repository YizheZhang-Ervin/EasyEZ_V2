from django.db import models


# Create your models here.
class article(models.Model):
    nid = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, verbose_name='article_title', editable=True)
    # email = models.EmailField(db_index=True)
    content = models.TextField()
    img = models.ImageField(upload_to='upload')
    article_type_choices = (
        (0, "Python"),
        (1, "Other"),
    )
    article_type = models.IntegerField(choices=article_type_choices, default=0)

    def __str__(self):
        return self.title
