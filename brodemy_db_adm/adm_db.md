

```python
import pymongo
from pymongo import MongoClient
from pprint import pprint
from bson.objectid import ObjectId
```


```python
client = MongoClient("mongodb+srv://admin:brodemy_admin@cluster0-z6v5t.mongodb.net/test")
db = client.brodemy
```


```python
def make_user(name, password, email):
    user = {
        "name" : name,
        "password" : password,
        "email" : email,
        "courses" : []
    }
    
    return user
```


```python
def make_course(name, description, instructor_id, category, level, requisites = [], image_src = None):
    if not isinstance(requisites, list):
        raise TypeError('requisites should be a list')
    if not isinstance(instructor_id, ObjectId):
        raise TypeError('instructor_id should be an ObjectId')
    if not isinstance(category, dict):
        raise TypeError('category should be a dict')
        
    course = {
        "name" : name, 
        "description" : description,
        "requisites" : requisites,
        "level" : level,
        "image_src" : image_src,
        "instructor_id" : instructor_id,
        "category" : category,
        "classes" : []
    }
    
    return course
```


```python
def make_class(name, description, duration, url):
    aula = {
        "name" : name,
        "description" : description,
        "duration" : duration,
        "url" : url
    }
    
    return aula
```


```python
def add_class_to_course(course, aula):
    if not isinstance(aula, dict):
        raise TypeError('aula should be a dict')
    if not isinstance(course, ObjectId):
        raise TypeError('course should be the ObjectId of the course')
        
    query = {
        "_id" : course
    }
    
    update = {
        "$push" : {
            "classes" : aula
        }
    }
    
    r = db.courses.update_one(query, update)
    return r.acknowledged
```


```python
def add_course_to_user(user, course):
    if not isinstance(course, ObjectId):
        raise TypeError('course should be the ObjectId of the course')
    if not isinstance(user, ObjectId):
        raise TypeError('user should be the ObjectId of the user')
    
    query = {
        "_id" : user
    }
    
    update = {
        "$push" : {
            "courses" : course
        }
    }
    
    r = db.users.update_one(query, update)
    return r.acknowledged
```


```python
def add_user(user):
    if not isinstance(user, dict):
        raise TypeError('user should be a dict')
        
    r = db.users.insert_one(user)
    return r.inserted_id
```


```python
def add_course(course):
    if not isinstance(course, dict):
        raise TypeError('course should be a dict')
        
    r = db.courses.insert_one(course)
    return r.inserted_id
```


```python
add_user(make_user("maria", "jose", "maria.jose@gmail.com"))
```




    ObjectId('5b11681c31b35202d4c8ef59')




```python
lucas = db.users.find_one({"email":"lucasabbade@hotmail.com"})
lucas_id = lucas['_id']
print(lucas_id)
```

    5b0f392031b3522887252ad1



```python
course_id = add_course(make_course("MongoDB Basics", "Introductory MongoDB", lucas_id, 
                                   {"category":"banco de dados", "sub_category":"mongodb"},
                                   "basic"))
```


```python
course_id
```




    ObjectId('5b1169eb31b35202d4c8ef5c')




```python
add_class_to_course(course_id, make_class("Introduction", "Course presentation", 5, 
                                          "https://www.youtube.com/watch?v=9OPP_1eAENg"))
```




    True




```python
maria = db.users.find_one({"email":"maria.jose@gmail.com"})
maria_id = maria['_id']
print(maria_id)
```

    5b11681c31b35202d4c8ef59



```python
add_course_to_user(maria_id, course_id)
```




    True




```python
python_course = db.courses.find_one({"name":"Python 101"})
python_course_id = python_course['_id']
python_course_id
```




    ObjectId('5b11693e31b35202d4c8ef5a')




```python
add_course_to_user(maria_id, python_course_id)
```




    True



### Visualizando os cursos dos instrutores:


```python
def see_instructor_courses(instructor = None):
    lookup = {
        "$lookup" : {
            "from" : "courses",
            "localField" : "_id",
            "foreignField" : "instructor_id",
            "as" : "instructor_courses"
        }
    }
    
    project = {
        "$project" : {
            "total_courses" : {
                "$size" : "$instructor_courses"
            },
            "email" : 1,
            "name" : 1,
            "instructor_courses" : 1
        }
    }
    
    if isinstance(instructor, ObjectId):
        match = {
            "$match" : {
                "_id" : instructor
            }
        }
    elif isinstance(instructor, str):
        match = {
            "$match" : {
                "email" : instructor 
            }
        }
    else:
        match = {
            "$match" : {
                "total_courses" : {
                    "$gt" : 0
                }
            }
        }
    
    pipeline = [lookup, project, match]

    return list(db.users.aggregate(pipeline))
```


```python
pprint(see_instructor_courses())
```

    [{'_id': ObjectId('5b0f392031b3522887252ad1'),
      'email': 'lucasabbade@hotmail.com',
      'instructor_courses': [{'_id': ObjectId('5b11693e31b35202d4c8ef5a'),
                              'category': {'category': 'software',
                                           'sub_category': 'python'},
                              'classes': [],
                              'description': 'Introductory Python',
                              'image_src': None,
                              'instructor_id': ObjectId('5b0f392031b3522887252ad1'),
                              'level': 'basic',
                              'name': 'Python 101',
                              'requisites': []},
                             {'_id': ObjectId('5b1169eb31b35202d4c8ef5c'),
                              'category': {'category': 'banco de dados',
                                           'sub_category': 'mongodb'},
                              'classes': [{'description': 'Course presentation',
                                           'duration': 5,
                                           'name': 'Introduction',
                                           'url': 'https://www.youtube.com/watch?v=9OPP_1eAENg'}],
                              'description': 'Introductory MongoDB',
                              'image_src': None,
                              'instructor_id': ObjectId('5b0f392031b3522887252ad1'),
                              'level': 'basic',
                              'name': 'MongoDB Basics',
                              'requisites': []}],
      'name': 'lucas',
      'total_courses': 2}]



```python
pprint(see_instructor_courses("maria.jose@gmail.com"))
```

    [{'_id': ObjectId('5b11681c31b35202d4c8ef59'),
      'email': 'maria.jose@gmail.com',
      'instructor_courses': [],
      'name': 'maria',
      'total_courses': 0}]



```python
pprint(see_instructor_courses(maria_id))
```

    [{'_id': ObjectId('5b11681c31b35202d4c8ef59'),
      'email': 'maria.jose@gmail.com',
      'instructor_courses': [],
      'name': 'maria',
      'total_courses': 0}]



```python
pprint(see_instructor_courses(lucas_id))
```

    [{'_id': ObjectId('5b0f392031b3522887252ad1'),
      'email': 'lucasabbade@hotmail.com',
      'instructor_courses': [{'_id': ObjectId('5b11693e31b35202d4c8ef5a'),
                              'category': {'category': 'software',
                                           'sub_category': 'python'},
                              'classes': [],
                              'description': 'Introductory Python',
                              'image_src': None,
                              'instructor_id': ObjectId('5b0f392031b3522887252ad1'),
                              'level': 'basic',
                              'name': 'Python 101',
                              'requisites': []},
                             {'_id': ObjectId('5b1169eb31b35202d4c8ef5c'),
                              'category': {'category': 'banco de dados',
                                           'sub_category': 'mongodb'},
                              'classes': [{'description': 'Course presentation',
                                           'duration': 5,
                                           'name': 'Introduction',
                                           'url': 'https://www.youtube.com/watch?v=9OPP_1eAENg'}],
                              'description': 'Introductory MongoDB',
                              'image_src': None,
                              'instructor_id': ObjectId('5b0f392031b3522887252ad1'),
                              'level': 'basic',
                              'name': 'MongoDB Basics',
                              'requisites': []}],
      'name': 'lucas',
      'total_courses': 2}]


### Visualizando os cursos de um aluno:


```python
def see_user_courses(user = None):
    unwind = {
        "$unwind" : "$courses"
    }
    
    lookup = {
        "$lookup" : {
            "from" : "courses",
            "localField" : "courses",
            "foreignField" : "_id",
            "as" : "course"
        }
    }
    
    project = {
        "$project" : {
            "course" : 1,
            "email" : 1,
            "name" : 1
        }
    }
    
    if isinstance(user, ObjectId):
        match = {
            "$match" : {
                "_id" : user
            }
        }
    elif isinstance(user, str):
        match = {
            "$match" : {
                "email" : user 
            }
        }
    else:
        raise TypeError("user should be either a string or an ObjectId")
    
    pipeline = [unwind, lookup, project, match]

    return list(db.users.aggregate(pipeline))
```


```python
pprint(see_user_courses("maria.jose@gmail.com"))
```

    [{'_id': ObjectId('5b11681c31b35202d4c8ef59'),
      'course': [{'_id': ObjectId('5b1169eb31b35202d4c8ef5c'),
                  'category': {'category': 'banco de dados',
                               'sub_category': 'mongodb'},
                  'classes': [{'description': 'Course presentation',
                               'duration': 5,
                               'name': 'Introduction',
                               'url': 'https://www.youtube.com/watch?v=9OPP_1eAENg'}],
                  'description': 'Introductory MongoDB',
                  'image_src': None,
                  'instructor_id': ObjectId('5b0f392031b3522887252ad1'),
                  'level': 'basic',
                  'name': 'MongoDB Basics',
                  'requisites': []}],
      'email': 'maria.jose@gmail.com',
      'name': 'maria'},
     {'_id': ObjectId('5b11681c31b35202d4c8ef59'),
      'course': [{'_id': ObjectId('5b11693e31b35202d4c8ef5a'),
                  'category': {'category': 'software', 'sub_category': 'python'},
                  'classes': [],
                  'description': 'Introductory Python',
                  'image_src': None,
                  'instructor_id': ObjectId('5b0f392031b3522887252ad1'),
                  'level': 'basic',
                  'name': 'Python 101',
                  'requisites': []}],
      'email': 'maria.jose@gmail.com',
      'name': 'maria'}]

