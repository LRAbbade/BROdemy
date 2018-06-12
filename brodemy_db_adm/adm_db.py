
# coding: utf-8

# In[1]:


import pymongo
from pymongo import MongoClient
from pprint import pprint
from bson.objectid import ObjectId


# In[2]:


client = MongoClient("mongodb+srv://admin:brodemy_admin@cluster0-z6v5t.mongodb.net/test")
db = client.brodemy


# In[37]:


def make_user(name, password, email):
    user = {
        "name" : name,
        "password" : password,
        "email" : email,
        "courses" : []
    }
    
    return user


# In[34]:


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


# In[31]:


def make_class(name, description, duration, url):
    aula = {
        "name" : name,
        "description" : description,
        "duration" : duration,
        "url" : url
    }
    
    return aula


# In[51]:


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


# In[52]:


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


# In[42]:


def add_user(user):
    if not isinstance(user, dict):
        raise TypeError('user should be a dict')
        
    r = db.users.insert_one(user)
    return r.inserted_id


# In[44]:


def add_course(course):
    if not isinstance(course, dict):
        raise TypeError('course should be a dict')
        
    r = db.courses.insert_one(course)
    return r.inserted_id


# In[43]:


add_user(make_user("maria", "jose", "maria.jose@gmail.com"))


# In[45]:


lucas = db.users.find_one({"email":"lucasabbade@hotmail.com"})
lucas_id = lucas['_id']
print(lucas_id)


# In[48]:


course_id = add_course(make_course("MongoDB Basics", "Introductory MongoDB", lucas_id, 
                                   {"category":"banco de dados", "sub_category":"mongodb"},
                                   "basic"))


# In[55]:


course_id


# In[53]:


add_class_to_course(course_id, make_class("Introduction", "Course presentation", 5, 
                                          "https://www.youtube.com/watch?v=9OPP_1eAENg"))


# In[54]:


maria = db.users.find_one({"email":"maria.jose@gmail.com"})
maria_id = maria['_id']
print(maria_id)


# In[56]:


add_course_to_user(maria_id, course_id)


# In[82]:


python_course = db.courses.find_one({"name":"Python 101"})
python_course_id = python_course['_id']
python_course_id


# In[83]:


add_course_to_user(maria_id, python_course_id)


# ### Visualizando os cursos dos instrutores:

# In[69]:


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


# In[70]:


pprint(see_instructor_courses())


# In[71]:


pprint(see_instructor_courses("maria.jose@gmail.com"))


# In[72]:


pprint(see_instructor_courses(maria_id))


# In[73]:


pprint(see_instructor_courses(lucas_id))


# ### Visualizando os cursos de um aluno:

# In[85]:


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


# In[86]:


pprint(see_user_courses("maria.jose@gmail.com"))

