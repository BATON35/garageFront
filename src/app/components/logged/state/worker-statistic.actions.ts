export class WorkerStatisticAction {
  static readonly type = '[WorkerStatistic] WorkerStatisticAction';
  constructor(public start: string, public end: string) { }
}
