import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TransactionService} from '../../services/transaction.service';
import {BlockService} from '../../services/block.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private subscriber: Subscription;
  public query: string;
  result = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private transactionService: TransactionService,
    private blockService: BlockService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.subscriber = this.route.queryParams.subscribe(params => {
      this.query = <string>params['q'];
      console.log(this.query);
      let queryInt = Number(this.query);
      if (!isNaN(queryInt)) {
        this.router.navigateByUrl('/tracker/blocks/' + this.query);
      } else if (this.query.length === 64) {
        
        this.transactionService.getTransaction(this.query).subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/tracker/transactions/' + this.query);
          }
        });
        
        this.blockService.getBlockId(this.query).subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/tracker/blocks/' + data['blockNumber']);
          }
        });
      } else if (this.query.length == 53) {
        // TODO: allow this
        this.accountService.getAccountKey(this.query).subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/tracker/accounts/' + data["name"]);
          }
        });
      } else {
        this.router.navigateByUrl('/tracker/accounts/' + this.query);
      }
    });
  }
}
