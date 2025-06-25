from rest_framework import serializers
from .models import LearnerStories,UserQuery

class LearnerStoriesSerializer(serializers.ModelSerializer):
    submitted_by = serializers.SerializerMethodField()

    class Meta:
        model = LearnerStories
        fields = ['storyId', 'story', 'submitted_by', 'created_at']

    def get_submitted_by(self, obj):
        return obj.user.username if obj.user else "Anonymous"

from rest_framework import serializers
from .models import UserQuery

class UserQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuery
        fields = ['area_of_issue', 'first_name', 'last_name', 'email', 'issue_detail']  # 'issue' changed to 'issue_detail'

    def validate_area_of_issue(self, value):
        """ Custom validation for area_of_issue to check if it is valid. """
        if value not in dict(UserQuery.AreaChoices.choices):
            raise serializers.ValidationError("Invalid area of issue.")
        return value


from .models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer']


# serializers.py
from rest_framework import serializers
from .models import ArticlesBlog, LearnerStories

class ArticlesBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticlesBlog
        fields = ['title', 'oneLinerHeader', 'mainContent']

class LearnerStoriesSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnerStories
        fields = ['story', 'user']
