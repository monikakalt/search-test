import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MerchantService } from 'src/app/services/merchant/merchant.service';
import { User } from 'src/app/models/user';
import { Merchant } from 'src/app/models/merchant';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from 'src/app/spinner/components/spinner/spinner.component';
import { ExportService } from 'src/app/services/merchant/export.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private userService: UserService, private merchantService: MerchantService,
              private toastr: ToastrService, private exportService: ExportService) { }
  searchQuery = '';
  isSearching: boolean;
  users: User[];
  merchants: Merchant[];
  hasResults = false;
  resultModel = [];

  @ViewChild('spinner', {static: true})
  spinner: SpinnerComponent;

  // #region [Search]
  searchQueryChanged() {
    if (!this.searchQuery) {
      return;
    }

    if (this.spinner) {
      this.spinner.setSpinner(true);
    }
    this.executeSearch();
  }

  executeSearch() {
    const usersSearchRequest = this.userService.search$(this.searchQuery);
    const merchantsSearchRequest = this.merchantService.search$(this.searchQuery);
    // generate request array for users and merchants
    const requests = [usersSearchRequest, merchantsSearchRequest];

    // join observables to execute them in parallel
    forkJoin(requests).subscribe((response: any[]) => {
      for (const r of response) {
        this.resultModel.push(...r);
      }

      this.resultModel = this.sortResults();

      this.hasResults = !!this.resultModel;
      if (this.resultModel.length <= 0) {
        this.toastr.error('Query did not return any results');
      }
      if (this.spinner) {
        this.spinner.setSpinner(false);
      }    }, (error: any) => {
        if (this.spinner) {
          this.spinner.setSpinner(false);
        }
        this.toastr.error(error);
    });

  }

  sortResults() {
    return this.resultModel.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  }

  clearSearch() {
    this.hasResults = false;
    this.searchQuery = '';
    this.resultModel = [];
  }

  // #endregion

  // #region [Export]
  export() {
    const title = this.searchQuery + '-' + new Date().toISOString().split('T')[0];
    this.exportService.downloadFile('csv', this.resultModel, title);
  }
  // #endregion
}
