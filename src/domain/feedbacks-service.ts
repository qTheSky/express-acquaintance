import {FeedbackDB, feedbacksRepository} from '../repositories/feedbacks-repository'
import {ObjectId} from 'mongodb'

export const feedbacksService = {
		async allFeedbacks(): Promise<FeedbackDB[]> {
				return feedbacksRepository.getAllFeedbacks()
		},
		async sendFeedback(comment: string, userId: ObjectId): Promise<FeedbackDB> {
				return await feedbacksRepository.createFeedback(comment, userId)
		},
}