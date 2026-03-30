from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_user_creation(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.assertEqual(user.email, 'test@example.com')

    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

    def test_activity_creation(self):
        user = User.objects.create_user(username='testuser2', email='test2@example.com', password='testpass')
        team = Team.objects.create(name='Test Team 2')
        activity = Activity.objects.create(user=user, team=team, type='run', duration=30)
        self.assertEqual(activity.type, 'run')

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Test Team 3')
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.points, 100)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Do 20 pushups')
        self.assertEqual(workout.name, 'Pushups')
