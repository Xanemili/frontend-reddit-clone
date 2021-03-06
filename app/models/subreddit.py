from .db import db
from datetime import datetime
from .subscription import Subscription

class Subreddit(db.Model):
    __tablename__ = 'subreddits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    about = db.Column(db.Text)
    rules = db.Column(db.Text)
    owner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())

    users = db.relationship("User", back_populates='subreddits')
    posts = db.relationship("Post", back_populates='subreddits')
    subscribers = db.relationship(
        'User', back_populates='subscriptions',
        secondary="subreddit_subscriptions", cascade='all')
      


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'about': self.about,
            'rules': self.rules,
            'owner': self.owner,
            'created_on': self.created_on,
            'subscribers': len(self.subscribers)
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
