import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

describe("Submit feedback", () => {
  {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy }
    );

    it("should be able to submit a feedback", async () => {
      await expect(
        submitFeedback.execute({
          type: "BUG",
          comment: "example",
          screenshot: "data:image/png;base64asdasdasfasefgsae3",
        })
      ).resolves.not.toThrow();

      expect(createFeedbackSpy).toHaveBeenCalled()
      expect(sendMailSpy).toHaveBeenCalled()
    });

    it("should not be able to submit a feedback without type", async () => {
      await expect(
        submitFeedback.execute({
          type: "",
          comment: "example",
          screenshot: "data:image/png;base64asdasdasfasefgsae3",
        })
      ).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64asdasdasfasefgsae3"
        })).rejects.toThrow()
})

it('should not be able to submit a feedback without correct format from screenshot', async () => {

    await expect(submitFeedback.execute({
        type: "BUG",
        comment: "comment",
        screenshot: "se64asdasdasfasefgsae3"
    })).rejects.toThrow()
})
  }
});
