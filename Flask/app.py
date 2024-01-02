from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy #Object Relation Mapper(ORM)
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Todo(db.Model): #inheritance from db.Model, used to create database model
    sno = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    desc = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self): # represnts the object and shows what to print if print(object) is called
        return f"{self.sno} - {self.title}"

@app.route('/')
def hello_world():
    return "Hello, world!"

@app.route('/posts')
def post():
    # return "This is post route!"
    todo = Todo(title="First Todo !", desc = "This is my first database line using Sqlite")
    db.session.add(todo) #used to perform db operations
    db.session.commit() #finalize the changes we made in the db
    allTodo = Todo.query.all()
    # print(allTodo)
    return render_template('index.html')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=7000)

# virtualenv environment_name
# if error in above step then write Set-ExecutionPolicy unrestricted 
# to set up environment : .\environment_name\Scripts\activate.ps1 