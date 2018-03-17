import {Component, ViewChild, PLATFORM_ID, Inject} from "@angular/core";
import {ObservableMedia} from "@angular/flex-layout";
import {MatSidenav} from "@angular/material";
import {Router} from "@angular/router";

@Component({
    selector: "nav-menu",
    templateUrl: "./navmenu.component.html",
    styleUrls: ["./navmenu.component.css"]
})
export class NavMenuComponent
{
    private _navLinks: INavLink[] = [
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/home",
            Icon: "home",
            ItemClasses: ["toolbarItem"],
            LinkText: "Home"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/data-table",
            Icon: "account_circle",
            ItemClasses: ["toolbarItem"],
            LinkText: "Leader Board"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/dashboard",
            Icon: "assignment",
            ItemClasses: ["toolbarItem"],
            LinkText: "Dashboard"
        }
    ];

    @ViewChild("sidenav")
    public SideNav: MatSidenav;

    constructor(public media: ObservableMedia, @Inject(PLATFORM_ID) platformId: any, private router: Router)
    {
        router.events.subscribe((val) =>
        {
            this.SideNav.close();
        });

        media.asObservable().subscribe(mChange =>
        {
            if (this.SideNav != null || this.SideNav != undefined && mChange.mqAlias != "xs" && mChange.mqAlias !== "sm"
            ) this.SideNav.close();
        });
    }

    public get NavLinks(): INavLink[]
    {
        return this._navLinks;
    }
}


interface INavLink
{
    AnchorClasses: string[];
    Link: string;
    Icon: string;
    ItemClasses: string[];
    LinkText: string;
}