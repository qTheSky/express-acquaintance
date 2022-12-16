import {ObjectId} from 'mongodb'
import {feedbacksCollection} from './db'


export interface FeedbackDB {
		_id: ObjectId
		comment: string
}

export const feedbacksRepository = {
		async getAllFeedbacks() {
				return await feedbacksCollection.find({}).toArray()
		},
		async createFeedback(comment: string, userId: ObjectId): Promise<FeedbackDB> {
				const result = await feedbacksCollection.insertOne({_id: userId, comment})
				return {comment, _id: userId}
		},
}