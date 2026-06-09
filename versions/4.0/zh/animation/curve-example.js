
(() => {
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {{xAxisText?: string; yAxisText?: string;}} config
     */
    window.drawCurve = (canvas, countGenPoint, config) => {
        config = config || {};

        const xrange = { min: 0.1, max: 0.9 };
        const yrange = { min: 0.1, max: 0.8 };
        const xAxisLine = { start: 0.0 * canvas.width, end: 0.7 * canvas.width }; // In pixel.
        const yAxisLine = { start: 0.7 * canvas.height, end: 0.1 * canvas.height }; // In pixel.
        const xAxisLength = xAxisLine.end - xAxisLine.start;
        const yAxisLength = yAxisLine.start - yAxisLine.end;

        const generateIncresingNumbers = (count, min, max) => {
            const intervals = new Array(count);
            let sum = 0;
            for (let i = 0; i < count; ++i) {
                const interval = Math.random();
                intervals[i] = interval;
                sum += interval;
            }
            const extent = max - min;
            let sumNi = 0;
            return intervals.map((interval) => {
                const ni = interval / sum;
                const result = min + sumNi * extent;
                sumNi += ni;
                return result;
            });
        };

        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fill();

        context.strokeStyle = 'black';

        const xs = generateIncresingNumbers(countGenPoint, xrange.min, xrange.max);
        const points = xs.map((x) => {
            return {
                x,
                y: yrange.min + (yrange.max - yrange.min) * Math.random(),
            };
        });
        const pointPixels = points.map((point) => {
            return {
                x: xAxisLine.start + point.x * xAxisLength,
                y: yAxisLine.start - point.y * yAxisLength,
            };
        });

        // Draw axises.
        context.moveTo(xAxisLine.start, yAxisLine.start);
        context.lineTo(xAxisLine.end, yAxisLine.start);
        context.moveTo(xAxisLine.start, yAxisLine.start);
        context.lineTo(xAxisLine.start, yAxisLine.end);

        // Draw curve.
        if (pointPixels.length > 1) {
            context.moveTo(pointPixels[0].x, pointPixels[0].y);
            for (let iPoint = 1; iPoint < points.length; ++iPoint) {
                context.lineTo(pointPixels[iPoint].x, pointPixels[iPoint].y);
            }
        }

        context.stroke();

        // Draw frames.
        context.setLineDash([1, 3]);
        pointPixels.forEach((pointPixel) => {
            context.moveTo(pointPixel.x, pointPixel.y);
            context.lineTo(pointPixel.x, yAxisLine.start);
        });
        context.stroke();

        // Draw points.
        context.fillStyle = 'red';
        pointPixels.forEach((pointPixel) => {
            const rectSize = 4;
            context.fillRect(pointPixel.x - rectSize / 2, pointPixel.y - rectSize / 2, rectSize, rectSize);
        });

        if (config.xAxisText) {
            context.fillText(config.xAxisText,  xAxisLine.end + 1, yAxisLine.start);
        }
        
        if (config.yAxisText) {
            context.fillText(config.yAxisText,  xAxisLine.start, yAxisLine.end - 1);
        }
    };
})();