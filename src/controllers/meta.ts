import { Get, JsonController } from "routing-controllers";

@JsonController()
export class MetaController {
    @Get('/meta')
    get() {
        return {
            honi: 'ほに',
        };
    }
}