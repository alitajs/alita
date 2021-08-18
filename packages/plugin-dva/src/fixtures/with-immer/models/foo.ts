
export interface IState {
  desc: string;
  count: number;
}

export default {
  state: {
    desc: 'foo',
    count: 0,
  } as IState,
  reducers: {
    add(state: IState) {
      state.count += 1;
    }
  }
}
