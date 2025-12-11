import { Schema, model, Document } from 'mongoose';

export interface UserType extends Document {
    email: string;
    password: string;
    interest_tags: string[];
    saved_articles : SavedArticleType[]; 
    read_articles : ReadArticleType[] 
}


interface SavedArticleType extends Document { 
    article_id: string; 
    timestamp: Date;
}

const SavedArticleSchema = new Schema<SavedArticleType>({
    article_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

interface ReadArticleType extends Document { 
    article_id: string; 
    timestamp: Date;
}

const ReadArticleSchema = new Schema<ReadArticleType>({
    article_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});



const UserSchema = new Schema<UserType>({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true  , 
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,"Input Correct Email "]
    },
    password: { 
        type: String, 
        required: [true,"Password is required"],
    }, 

    interest_tags: { 
        type: [String], 
        required: true, 
    }, 

    saved_articles : [SavedArticleSchema] , 
    read_articles : [ReadArticleSchema]
}, 
{
    timestamps:true
}
);

export const User = model<UserType>('User', UserSchema);