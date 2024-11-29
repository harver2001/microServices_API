from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_id = db.Column(db.Text, default="https://xsgames.co/randomusers/assets/images/favicon.png")
    likes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    comments = db.relationship('Comment', backref='post', cascade="all, delete", lazy=True)

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/createPosts', methods=['POST'])
def create_post():
    data = request.get_json()

    if not data or not data.get('title') or not data.get('content') or not data.get('user_id'):
        return jsonify({"error": "Missing required fields"}), 400

    new_post = Post(user_id = data['user_id'], title=data['title'], content=data['content'])

    try:
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message": "Post created successfully", "post_id": new_post.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/getPosts', methods=['GET'])
def get_posts():
    posts = Post.query.all()

    result = []
    for post in posts:
        post_data = {
            'id': post.id,
            'user_id' : post.user_id,
            'title': post.title,
            'content': post.content,
            'likes': post.likes,
            'created_at': post.created_at,
            'comments': [{'id': comment.id, 'content': comment.content, 'created_at': comment.created_at}
                         for comment in post.comments]
        }
        result.append(post_data)

    return jsonify(result), 200

@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404

    post_data = {
        'id': post.id,
        'user_id' : post.user_id,
        'title': post.title,
        'content': post.content,
        'likes': post.likes,
        'created_at': post.created_at,
        'comments': [{'id': comment.id, 'content': comment.content, 'created_at': comment.created_at}
                     for comment in post.comments]
    }

    return jsonify(post_data), 200

@app.route('/posts/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    post.likes += 1

    try:
        db.session.commit()
        return jsonify({"message": "Post liked", "likes": post.likes}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404

    data = request.get_json()

    if not data or not data.get('content'):
        return jsonify({"error": "Missing required fields"}), 400

    new_comment = Comment(content=data['content'], post_id=post_id)

    try:
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({"message": "Comment added", "comment_id": new_comment.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404

    try:
        db.session.delete(post)
        db.session.commit()
        return jsonify({"message": "Post deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    with app.app_context(): # even if we dont write the sql commands to create the tables in database this context and create_all will do that for us with the model of table given above
        db.create_all()

    app.run(debug=True)
