const { addNewUser } = require("./src/utilities/dbFunctions");
const { doc, setDoc } = require("firebase/firestore");

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe("addNewUser", () => {
  it("should add a new user document to Firestore", async () => {
    const userId = "test_user";
    const userData = {
      Relationships: [
        {
          firstName: "John",
          lastName: "Doe",
          contactInfo: {
            email: "johndoe@example.com",
            phoneNumber: "1234567890",
          },
          relationshipTag: ["Friend"],
        },
      ],
    };

    await addNewUser(userId, userData);

    expect(doc).toHaveBeenCalledWith(expect.anything(), "users", userId);
    expect(setDoc).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(userData));
  });
});
