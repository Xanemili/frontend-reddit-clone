from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Subreddit, Subscription, db, Post
from sqlalchemy.exc import IntegrityError

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    user = User.query.join(Subreddit).join(Post).filter(User.id == id).one()
    return user.to_joined_dict()


# @user_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_user(id):
#     user = User.query.get_or_404(id)
#     if user.deleted:
#         abort(404)
#     user.deleted = True
#     db.session.commit()
#     return '', 204


@user_routes.route('/subscriptions', methods=['GET'])
@login_required
def subscriptions():
    subscriptions = User.query.get(current_user.id).subscriptions
    return {"subscriptions": subscriptions}


@user_routes.route('/subscriptions', methods=['POST', 'DELETE'])
@login_required
def toggle_subscriptions():
    print(request.is_json)
    req_data = request.get_json()
    print(req_data)
    subreddit_name = req_data['subreddit']

    subreddit = Subreddit.query.filter(Subreddit.name == subreddit_name).first()
    subscription = Subscription.query.get((current_user.id, subreddit.id))

    new_type = 'ADD'
    try:
        if request.method == 'DELETE':
            db.session.delete(subscription)
            new_type = 'REMOVE'
        else:
            if subscription:
                raise IntegrityError('Entry already exists',
                                     subscription, 'user_routes')
            new_sub = Subscription(
                user_id=current_user.id,
                subreddit_id=subreddit.id
            )
            db.session.add(new_sub)
        db.session.commit()
    except IntegrityError:
        return {"errors": "There was a problem processing your request."}

    return {"subscription": subreddit_name, "type": new_type}
