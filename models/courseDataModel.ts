import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { ILink, linkSchema } from "./linkModel";
import { IComment, commentSchema } from "./commentModel"

export interface ICourseData extends Document {
    courseId: object;
    title: string;
    description: string | null;
    videoThumbnail?: {
        path: string;
        url: string;
    };
    videoUrl?: string;
    videoPath?: string;
    videoSection: string | null;
    videoLength: number;
    links?: ILink[];
    suggestion: string;
    questions?: Types.DocumentArray<IComment>;
}

const courseDataSchema = new Schema<ICourseData>({
    courseId: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    videoThumbnail: {
        path: { type: String },
        url: { type: String },
    },
    videoSection: {
        type: String,
        default: null
    },
    videoPath: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true
    },
    videoLength: {
        type: Number,
        required: true
    },
    links: [linkSchema],
    suggestion: { type: String },
    questions: [commentSchema],
});

export const CourseDataModel: Model<ICourseData> = mongoose.model("CourseData", courseDataSchema);
export { courseDataSchema };
