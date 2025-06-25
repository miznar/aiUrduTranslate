from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinLengthValidator
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth.hashers import make_password, check_password
from django.db.models.signals import post_save
from django.dispatch import receiver
from uuid import uuid4



import uuid
from django.contrib.auth.hashers import make_password, check_password
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinLengthValidator
import uuid
from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.hashers import make_password, check_password
from django.db.models.signals import post_save
from django.dispatch import receiver

# === Base Model with Common Fields ===
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True
        ordering = ['-created_at']

# === Custom Manager for Active Entries ===
class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

# === UserProfile Model ===
class ufUserProfile(BaseModel):
    id = models.AutoField(primary_key=True)  
    email = models.EmailField(unique=True, help_text="User's unique email")
    password = models.CharField(max_length=128)
    username = models.CharField(
        max_length=512, 
        unique=True, 
        validators=[MinLengthValidator(3)],
        help_text="Unique username with minimum 3 characters"
    )
    full_name = models.CharField(max_length=100)
    interests = models.JSONField(default=list, help_text="List of user interests")
    token = models.CharField(max_length=512, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    first_login = models.DateTimeField(blank=True, null=True)
    mid_login= models.DateTimeField(blank=True, null=True)
    objects = ActiveManager()

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
    # Remove this hashing as set_password takes care of it
       super().save(*args, **kwargs)

    class Meta:
        db_table = "ufuser_profile"
        indexes = [
            models.Index(fields=['email'], name='idx_user_email'),
            models.Index(fields=['username'], name='idx_user_username'),
        ]
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"
    
    def __init__(self, *args, **kwargs):
        """Override init to store the original password for comparison."""
        super().__init__(*args, **kwargs)
        self.__original_password = self.password

@receiver(post_save, sender=ufUserProfile)
def welcome_user(sender, instance, created, **kwargs):
    if created:
        print(f"Welcome {instance.username}!")



class UploadedVideoLecture(BaseModel):
    videoId = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    uploadedBy = models.ForeignKey(ufUserProfile, on_delete=models.CASCADE, related_name='uploaded_videos')
    videoTitle = models.CharField(max_length=255)
    video_file = models.FileField(upload_to='uploaded_files/')
    subject = models.ForeignKey('Subject', on_delete=models.SET_NULL, null=True, blank=True, related_name='videos')
    transcript = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.videoTitle

    class Meta:
        db_table = "uploaded_video_lecture"
        verbose_name = "Uploaded Video Lecture"
        verbose_name_plural = "Uploaded Video Lectures"



class Subject(BaseModel):
    subjectId = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "subject"
        verbose_name = "Subject"
        verbose_name_plural = "Subjects"


from django.utils.translation import gettext_lazy as _

class TranslationStatus(models.TextChoices):
    DONE = 'done', _('Done')
    UNDONE = 'undone', _('Undone')

class LectureTranslation(BaseModel):
    translationId = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    video = models.ForeignKey(UploadedVideoLecture, on_delete=models.CASCADE, related_name='translations')
    sourceText = models.TextField()
    translatedText = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=TranslationStatus.choices, default=TranslationStatus.UNDONE)

    def __str__(self):
        return f"Translation {self.translationId} - {self.status}"

    class Meta:
        db_table = "lecture_translation"
        verbose_name = "Lecture Translation"
        verbose_name_plural = "Lecture Translations"


class LearnerStories(BaseModel):
    storyId = models.UUIDField(default=uuid4, editable=False, unique=True)
    user = models.ForeignKey(
        ufUserProfile,
        on_delete=models.CASCADE,
        related_name='learner_stories',
        null=True,  # <-- allow null for anonymous submissions
        blank=True
    )
    story = models.TextField(help_text="Learner's personal story or feedback")

    def __str__(self):
        return f"Learner Story by {self.user.username if self.user else 'Anonymous'}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = "User Learner Story"
        verbose_name_plural = "User Learner Stories"

class UserQuery(BaseModel):
    class AreaChoices(models.TextChoices):
        FEATURE = 'feature', _('Feature')
        BUG = 'bug', _('Bug')
        FEEDBACK = 'feedback', _('Feedback')

    queryId = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    area_of_issue = models.CharField(max_length=20, choices=AreaChoices.choices)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    issue_detail = models.TextField(help_text="User's issue or query description")

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.area_of_issue}"

    class Meta:
        db_table = "user_query"
        verbose_name = "User Query"
        verbose_name_plural = "User Queries"

from django.db import models

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

    class Meta:
        db_table = "faq"
        ordering = ['-created_at']

from uuid import uuid4
from django.db import models

class ArticlesBlog(BaseModel):
    articleId = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=255)
    oneLinerHeader = models.TextField(default="How Large Language Models Are Revolutionizing")
    mainContent = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        db_table = "articles_blog"
        verbose_name = "Articles Blog"
        verbose_name_plural = "Articles Blogs"
        ordering = ['-created_at']  

# dicsussions models

class Discussion(BaseModel):
    discussionId = models.UUIDField(default=uuid4, editable=False, unique=True)
    author = models.ForeignKey(ufUserProfile, on_delete=models.CASCADE, related_name='discussions')
    video = models.ForeignKey(UploadedVideoLecture, on_delete=models.CASCADE, related_name='discussions')
    body = models.TextField()
    likes = models.ManyToManyField(ufUserProfile, related_name='liked_discussions', blank=True)

    def __str__(self):
        return f"Discussion by {self.author.username} on {self.video.videoTitle}"

    def total_likes(self):
        return self.likes.count()

    class Meta:
        db_table = "discussion"
        verbose_name = "Discussion"
        verbose_name_plural = "Discussions"


class DiscussionReply(BaseModel):
    replyId = models.UUIDField(default=uuid4, editable=False, unique=True)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='replies')
    author = models.ForeignKey(ufUserProfile, on_delete=models.CASCADE, related_name='replies')
    body = models.TextField()
    likes = models.ManyToManyField(ufUserProfile, related_name='liked_replies', blank=True)

    def __str__(self):
        return f"Reply by {self.author.username} on discussion {self.discussion.discussionId}"

    def total_likes(self):
        return self.likes.count()

    class Meta:
        db_table = "discussion_reply"
        verbose_name = "Discussion Reply"
        verbose_name_plural = "Discussion Replies"






















# # === Base model with common fields ===
# class BaseModel(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     is_deleted = models.BooleanField(default=False)

#     class Meta:
#         abstract = True

# # === Custom Manager for active (non-deleted) entries ===
# class ActiveManager(models.Manager):
#     def get_queryset(self):
#         return super().get_queryset().filter(is_deleted=False)

# class UserProfile(BaseModel):
#     email = models.EmailField(unique=True, help_text="User's unique email")
#     password = models.CharField(max_length=128)
#     username = models.CharField(max_length=50, unique=True, validators=[MinLengthValidator(3)])
#     full_name = models.CharField(max_length=100)
#     interests = models.JSONField(default=list)
#     token = models.CharField(max_length=255, blank=True, null=True)

#     objects = ActiveManager()

#     def __str__(self):
#         return self.username

#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)

# @receiver(post_save, sender=UserProfile)
# def welcome_user(sender, instance, created, **kwargs):
#     if created:
#         print(f"Welcome {instance.username}!")

# class Subject(BaseModel):
#     subjectId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     name = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return self.name

# class UploadedVideoLecture(BaseModel):
#     videoId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     uploadedBy = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='uploaded_videos')
#     videoTitle = models.CharField(max_length=255)
#     video_file = models.FileField(upload_to='videos/')
#     subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, related_name='videos')
#     transcript = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return self.videoTitle

# class TranslationStatus(models.TextChoices):
#     DONE = 'done', _('Done')
#     UNDONE = 'undone', _('Undone')

# class LectureTranslation(BaseModel):
#     # translationId = models.UUIDField(primary_key=True, default=uuid4, editable=False)
#     video = models.ForeignKey(UploadedVideoLecture, on_delete=models.CASCADE, related_name='translations')
#     sourceText = models.TextField()
#     translatedText = models.TextField(blank=True, null=True)
#     status = models.CharField(max_length=10, choices=TranslationStatus.choices, default=TranslationStatus.UNDONE)

#     def __str__(self):
#         return f"Translation {self.translationId} - {self.status}"
    
# class ArticlesBlog(BaseModel):
#     articleId = models.UUIDField(default=uuid4, editable=False, unique=True, primary_key=True)
#     title = models.CharField(max_length=255)
#     oneLinerHeader = models.TextField(default="How Large Language Models Are Revolutionizing")
#     mainContent = models.TextField()

#     def __str__(self):
#         return self.title

# class LearnerStory(BaseModel):
#     storyId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='learner_stories')
#     story = models.TextField()

#     def __str__(self):
#         return f"Story by {self.user.email}"

#     class Meta:
#         ordering = ['-created_at']

# class RequestStatus(models.TextChoices):
#     PENDING = 'pending', _('Pending')
#     COMPLETED = 'completed', _('Completed')

# class TranslationRequest(BaseModel):
#     requestId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     video = models.ForeignKey(UploadedVideoLecture, on_delete=models.CASCADE)
#     requestedBy = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
#     status = models.CharField(max_length=20, choices=RequestStatus.choices, default=RequestStatus.PENDING)

# class TicketStatus(models.TextChoices):
#     OPEN = 'open', _('Open')
#     CLOSED = 'closed', _('Closed')

# class SupportTicket(BaseModel):
#     ticketId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
#     subject = models.CharField(max_length=255)
#     message = models.TextField()
#     status = models.CharField(max_length=20, choices=TicketStatus.choices, default=TicketStatus.OPEN)

# class Discussion(BaseModel):
#     discussionId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='discussions')
#     body = models.TextField()
#     content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
#     object_id = models.UUIDField()
#     content_object = GenericForeignKey('content_type', 'object_id')
#     likes = models.ManyToManyField(UserProfile, related_name='liked_discussions', blank=True)

#     def __str__(self):
#         return f"Discussion by {self.author.username}"

#     def total_likes(self):
#         return self.likes.count()

# class DiscussionReply(BaseModel):
#     replyId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='replies')
#     author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='replies')
#     body = models.TextField()
#     likes = models.ManyToManyField(UserProfile, related_name='liked_replies', blank=True)

#     def __str__(self):
#         return f"Reply by {self.author.username}"

#     def total_likes(self):
#         return self.likes.count()

# class Quiz(BaseModel):
#     quizId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     title = models.CharField(max_length=255)
#     related_video = models.ForeignKey(UploadedVideoLecture, on_delete=models.CASCADE, related_name='quizzes')

#     def __str__(self):
#         return self.title

# class QuizQuestion(BaseModel):
#     questionId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
#     question_text = models.TextField()
#     option_a = models.CharField(max_length=255)
#     option_b = models.CharField(max_length=255)
#     option_c = models.CharField(max_length=255)
#     option_d = models.CharField(max_length=255)
#     correct_option = models.CharField(max_length=1, choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')])

#     def __str__(self):
#         return self.question_text

# class UserQuizAttempt(BaseModel):
#     attemptId = models.UUIDField(default=uuid4, editable=False, unique=True)
#     user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='quiz_attempts')
#     quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
#     score = models.IntegerField()
#     total_questions = models.IntegerField()

#     def __str__(self):
#         return f"{self.user.username}'s attempt on {self.quiz.title}"
