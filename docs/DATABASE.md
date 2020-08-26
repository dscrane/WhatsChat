#### DB Models
#####user model:  
    id,
    name,
    username,
    email,
    password (hashed),  
    created rooms (id),  
    favorite rooms (id),
    avatar,
    auth token,
    sign up date



#####room model:  
    id,
    name,
    password (hashed),
    creator (id),
    members (id),
    public/private tag,
    avatar,
    creation date
