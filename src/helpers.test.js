const axios = require("axios");

const helpers = require("./helpers.js");

jest.mock("uuid", () => {
  return () => "1234";
});

describe("helpers", () => {
  describe("makePerson()", () => {
    it("should create a person", () => {
      const expected = {
        id: "1234",
        name: "Frodo Baggins"
      };

      const actual = helpers.makePerson("Frodo", "Baggins");

      expect(actual).toEqual(expected);
    });
  });

  describe("forEvenOnly()", () => {
    it("should invoke callback using the number passed when given an even number", () => {
      const spy = jest.fn();

      helpers.forEvenOnly(2, spy);
      helpers.forEvenOnly(4, spy);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 2);
      expect(spy).toHaveBeenNthCalledWith(2, 4);
    });

    it("should NOT invoke callback when given an odd number", () => {
      const spy = jest.fn();

      helpers.forEvenOnly(1, spy);

      expect(spy).not.toHaveBeenCalled();
    });

    it("returns a smile", () => {
      const spy = jest.fn(() => "smile");

      const greeting = helpers.greet(spy);

      expect(greeting).toBe("smile");
    });
  });

  describe("some API", () => {
    it("succeeds with correct password", done => {
      const url = "https://anyapi/";
      const payload = { password: "mellon" };

      axios.post(url, payload).then(res => {
        expect(res.success).toBe(true);
        expect(res.statusCode).toBe(200);

        done();
      });
    });
    it("fails with wrong password", done => {
      const url = "https://anyapi/";
      const payload = { password: "wrong" };

      axios.post(url, payload).catch(res => {
        expect(res.success).toBe(false);
        expect(res.statusCode).toBe(401);

        done();
      });
    });
  });
});

/*
using __mocks__     [axios.post(url, payload)]
mock the post behavior of axios to take a url and a payload and 
if the payload contains a password with the value 'mellon' 
return           {success: true, statusCode: 200} 
otherwise return { success: false, statusCode: 401 }
*/
