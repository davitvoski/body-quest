


function sum(a, b) {
    return a + b;
}

describe("Testing our pipline - should pass", () => {
    it("Testing a sum function that passes", async () => {
        expect(sum(1, 2)).toBe(3);
    })
})
