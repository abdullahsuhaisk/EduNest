import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDTO } from './dtos/get-estimate.dto';
import { Report } from './report.entity';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
    createEstimate({ make, model, lng, lat, mileage, year }: GetEstimateDTO): Promise<any>;
}
