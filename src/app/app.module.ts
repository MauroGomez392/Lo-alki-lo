import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyProductsComponent } from './pages/profile/my-products/my-products.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyFavoritesComponent } from './pages/profile/my-favorites/my-favorites.component';
import { AnuncioComponent } from './pages/home/anuncio/anuncio.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SubirProductoComponent } from './pages/subir-producto/subir-producto.component';
import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import { ProfileLayoutComponent } from './layout/profile-layout/profile-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PerfilUsuarioComponent } from './pages/home/anuncio/perfil-usuario/perfil-usuario.component';
import { BuscadorComponent } from './pages/home/buscador/buscador.component';
import { MyProfileComponent } from './pages/profile/my-profile/my-profile.component';
import { ValoracionesComponent } from './pages/profile/valoraciones/valoraciones.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateEqualModule } from 'ng-validate-equal';
import { ProductsService } from './shared/products.service';
import { FechaPipe } from './pipes/fecha.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MyProductsComponent,
    FooterComponent,
    MyFavoritesComponent,
    AnuncioComponent,
    ChatComponent,
    SubirProductoComponent,
    HeaderLayoutComponent,
    ProfileLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    PerfilUsuarioComponent,
    BuscadorComponent,
    MyProfileComponent,
    ValoracionesComponent,
    FechaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    ValidateEqualModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
