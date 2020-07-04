export default class PaperSize {
  static readonly Letter = new PaperSize(816, 1056);

  private constructor(
    public readonly width: number,
    public readonly height: number
  ) {}
}
