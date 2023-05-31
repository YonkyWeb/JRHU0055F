import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from 'src/app/app.service';
import { SesionDataEnum } from 'src/app/model/enums';
import { SitioTrabajador } from 'src/app/model/sitio-trabajador';
import { UsuarioSesion } from 'src/app/model/usuario-sesion';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    usuarioSesion:UsuarioSesion = new UsuarioSesion();
    nombreUsuario:string;
    valid:boolean = true;
    azCodigo:number;
    deaCodigo:number;
    idUsuario:string;

    constructor(private router: Router,
        private storage: LocalStorageService,
        private appService:AppService,
        private toast:ToastrService) { }

    ngOnInit(): void {
        if(!this.appService.isUserLogged()) {
            this.toast.info("No se ha detectado una sesion de usuario activa.");
            window.location.href = SitioTrabajador.URL;
        }

        this.usuarioSesion = this.storage.retrieve(SesionDataEnum.usuarioSesion);
        this.nombreUsuario = this.usuarioSesion.nombreUsuario.split(' ', 1)[0];
        this.nombreUsuario = this.capitalizeFirstLetter(this.nombreUsuario);
    }

    go(route: string) {
        this.router.navigate([route]);
        window.scroll(0, 0);
    }

    capitalizeFirstLetter(str:string) {
        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
}
