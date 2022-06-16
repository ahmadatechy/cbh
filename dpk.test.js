const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal 'number' when given input object with partitionKey:number ", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:1});
    expect(trivialKey).toBe("1");
  });

  it("Returns the hash when given input is empty object (no partitionKey)", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe("c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862");
  });

  it("Returns the literal 'object' when given input object with partitionKey:object ", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:{test:1}});
    expect(trivialKey).toBe('{"test":1}');
  });

  it("Returns the literal 'object' when given input object with partitionKey:long string ", () => {
    var longString = new Array(300 + 1).join( 'e' );
    const trivialKey = deterministicPartitionKey({partitionKey:longString});
    expect(trivialKey).toBe('9cacfb0ef21e883bcca6072854b1d422ff46ef1727edd5f76ef278468117e7bc047891ec070920edb164b85b521749895e63f34556838cee3de876f1b9c42e20');
  });
});
