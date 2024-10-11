from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy #Object Relation Mapper(ORM)
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Post(db.Model): #inheritance from db.Model, used to create database model
    sno = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(500), nullable=False)
    date_uploaded = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    thumbnail_url = db.Column(db.String, nullable=False)
    creatorId = db.Column(db.String, nullable=False)
    likes = db.Column(db.Integer, default = 0)


    def __repr__(self) -> str:
        return f"{self.sno} - {self.title} - {self.desc}"

@app.route('/', methods=['GET', 'POST'])
def hello_world():
    data = request.get_json()
    if request.method=='POST':
        title = data.get('title')
        desc = data.get('desc')
        image_url = data.get('image_url')
        thumbnail_url = data.get('thumbnail_url')
        creatorId = data.get('creatorId')
        date_uploaded = str(datetime.utcnow())[0:-7]
        post = Post(title=title, desc=desc, date_uploaded= date_uploaded, creatorId=creatorId, thumbnail_url=thumbnail_url,image_url=image_url)
        db.session.add(post)
        db.session.commit()
        
    allPost = Post.query.all() 
    return allPost

@app.route('/likes/<int:sno>', methods = ['POST', 'GET'])
def updateLike(sno):
    if request.method == 'POST':
        post = Post.query.filter_by(sno=sno).first()
        post.likes += 1
        db.session.add(post)
        db.session.commit()


@app.route('/update/<int:sno>', methods=['GET', 'POST'])
def update(sno):
    data = request.get_json()
    if request.method=='POST':
        title = data.get('title')
        desc = data.get('desc')
        post = Post.query.filter_by(sno=sno).first()
        post.title = title
        post.desc = desc
        db.session.add(post)
        db.session.commit()
        # by default flask will take GET method if nothing is mentioned like above POST request is mentioned so thats why below 2 lines will come under GET request
    post = Post.query.filter_by(sno=sno).first()
    allPost = Post.query.all()
    return allPost 

@app.route('/delete/<int:sno>')
def delete(sno):
    post = Post.query.filter_by(sno=sno).first()
    db.session.delete(post)
    db.session.commit()
    return "Data Entry Deleted"

with app.app_context(): #to create a db within the context of the app
    db.create_all()

if __name__ == "__main__":
    

# virtualenv environment_name
# if error in above step then write Set-ExecutionPolicy unrestricted 
# to set up environment : .\environment_name\Scripts\activate.ps1 