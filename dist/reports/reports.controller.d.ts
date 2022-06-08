import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDTO } from './dtos/get-estimate.dto';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    createReport(body: CreateReportDto, user: User): Promise<import("./report.entity").Report>;
    approveReport(id: string, body: ApproveReportDto): Promise<import("./report.entity").Report>;
    getEstimate(query: GetEstimateDTO): Promise<any>;
}
