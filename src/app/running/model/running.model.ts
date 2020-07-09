
export interface Point {
    latitude: number;
    longitude: number;
    time: number;
}

export class Route {
    points: Point[] = [];

    constructor() {}

    private pointToPointDistance(point1: Point, point2: Point) {
        function degreesToRadians(degrees: number) {
            return degrees * Math.PI / 180;
        }
        const earthRadiusKm = 6371;
        const dLat = degreesToRadians(point2.latitude - point1.latitude);
        const dLon = degreesToRadians(point2.longitude - point1.longitude);

        const lat1 = degreesToRadians(point1.latitude);
        const lat2 = degreesToRadians(point2.latitude);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    }

    addPoint(newPoint: Point): void {
        this.points.push(newPoint);
    }

    getDistanceInKm(): number {
        let distance = 0;
        this.points.forEach((point: Point, idx: number) => {
            if (idx === 0)
                return;

            distance += this.pointToPointDistance(this.points[idx - 1], point);
        });
        return distance;
    }

    getTotalTime(): number {
        if (this.points.length === 0)
            return 0;

        return this.points[this.points.length - 1].time - this.points[0].time;
    }

    getAverageSpeedPointToPoint(point1: Point, point2: Point): number {
        const distance = this.pointToPointDistance(point1, point2);
        if (distance === 0)
            return 0;

        return distance / ((((point2.time - point1.time) / 1000) / 60) / 60);
    }
    getAverageSpeed(): number {
        const distance = this.getDistanceInKm();
        const time = this.getTotalTime();
        if (distance === 0 || time === 0)
            return 0;

        return distance / (((time / 1000) / 60) / 60);
    }
}

export class Person {
    private height: number;
    private weight: number;

    constructor(height: number, weight: number) {
        this.height = height;
        this.weight = weight;
    }

    calculateCalories(speed: number, seconds: number): number {
        return ((speed * this.weight * 0.0175) / 60) * seconds;
    }
}
