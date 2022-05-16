export type Get<Input, Return> = (input: Input) => Return
export type Fetch<Input, Return> = (input: Input) => Promise<Return>
