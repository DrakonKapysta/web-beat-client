export class CanvasHelper {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private WIDTH: number;
  private HEIGHT: number;
  private data: Uint8Array;
  private bufferLength: number;
  private analyser?: AnalyserNode;
  private color?: string;
  private drawVisual: number | null = null;
  constructor(
    canvas: HTMLCanvasElement,
    WIDTH: number,
    HEIGHT: number,
    data: Uint8Array,
    bufferLength: number,
    analyser?: AnalyserNode,
    color?: string
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.data = data;
    this.bufferLength = bufferLength;
    this.analyser = analyser;
    this.color = color;
  }

  public setAnalyser(analyser: AnalyserNode): void {
    this.analyser = analyser;
  }
  public init(): void {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }
  public setColor(color: string): void {
    this.color = color;
  }
  public setCanvasSize(width: number, height: number): void {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.canvas.width = width;
    this.canvas.height = height;

    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";

    this.init();
  }
  public drawWave(): void {
    if (!this.analyser) return;
    this.drawVisual = requestAnimationFrame(this.drawWave.bind(this));

    this.analyser.getByteFrequencyData(this.data);

    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    const usableData = Math.floor(this.bufferLength * 0.5);

    const barWidth = this.WIDTH / usableData;

    for (let i = 0; i < usableData; i++) {
      const barHeight = (this.data[i] / 255) * this.HEIGHT;
      const progress = i / usableData;

      const r = Math.floor(147 + (219 - 147) * progress);
      const g = Math.floor(51 + (39 - 51) * progress);
      const b = Math.floor(234 + (119 - 234) * progress);

      const rgba = `rgba(${r}, ${g}, ${b}, ${this.data[i] / 32})`;
      this.ctx.fillStyle = rgba;
      this.ctx.fillRect(
        i * barWidth,
        this.HEIGHT - barHeight,
        barWidth,
        barHeight
      );
    }
  }

  public drawHarmonics(): void {
    if (!this.analyser) return;
    this.drawVisual = requestAnimationFrame(this.drawHarmonics.bind(this));

    this.analyser.getByteFrequencyData(this.data);

    this.ctx.fillStyle = "rgb(15 23 42)";
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    const usableData = Math.floor(this.bufferLength * 0.5);
    const barWidth = this.WIDTH / usableData;

    for (let i = 0; i < usableData; i++) {
      const rawValue = this.data[i];

      const enhancedValue = Math.pow(rawValue / 255, 0.6) * 255;
      const normalizedValue = enhancedValue / 255;

      const minHeight = 1;
      const maxHeight = this.HEIGHT * 0.85;
      const barHeight = Math.max(minHeight, normalizedValue * maxHeight);

      const progress = i / usableData;
      const r = Math.floor(147 + (219 - 147) * progress);
      const g = Math.floor(51 + (39 - 51) * progress);
      const b = Math.floor(234 + (119 - 234) * progress);

      const alpha = Math.max(0.7, normalizedValue);
      const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

      this.ctx.fillStyle = rgba;
      this.ctx.fillRect(
        i * barWidth + 1,
        this.HEIGHT - barHeight,
        barWidth - 2,
        barHeight
      );
    }
  }

  public stopAnimation(): void {
    if (this.drawVisual !== null) {
      cancelAnimationFrame(this.drawVisual);
      this.drawVisual = null;
    }
  }
}
