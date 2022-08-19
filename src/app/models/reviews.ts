export class Reviews {
  id: number;
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  imageUrl: string;
  isApproved: boolean;
  title: string;
  reviewText: string;
  replyText: string;
  customerNotifiedOfReply: boolean;
  rating: number;
  helpfulYesTotal: number;
  helpfulNoTotal: number;
  createdOn: string;
  updatedOn: string;
}
