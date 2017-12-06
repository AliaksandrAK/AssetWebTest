
function ExcelLineReport() {

    var lPathName = window.location.pathname.toLowerCase();
    var baseUrl = lPathName.replace("login/proposals/launchexcelprop.asp", "");
    var selectedNotes = "Test_Notes";


    var propFNew = "select+distinct+proposals%2EUserAssigned%2C+proposals%2EAssignedTo%2C+proposals%2ESchedDate%2C+subid+%3D+scloc%2Esub%5Fid%2C+ippid+%3D+" +
    "proposals%2Eiid%2C+proposals%2Erfp%5F%23%2C+proposals%2EExtStatus%2C+scloc%2Eregion%2C+scloc%2Edistrict%2C+site+%3D+scloc%2Estore%5Fid%2C+" +
    "scloc%2Eshort%5Fname%2C+scloc%2Eaddress2%2C+scloc%2Ecity%2C+scloc%2Estate%2C+scloc%2Ezip%2C+scloc%2Ecountry%2C+locID+%3D+scloc%2Eid%2C++" +
    "trade+%3D+IsNull%28proposals%2Etrade%2C%27%27%29%2C+propNumber+%3D+proposals%2Eid%2C+proposals%2EAmount%2C+proposals%2Edate%2C+CASE+WHEN+" +
    "not+exists+%28select+top+1+1+from+ProposalCategory+with+%28nolock%29+where+Proposal%5FID+%3D+proposals%2Eiid%29+THEN+proposals%2Edate+else+" +
    "dbo%2ELoc%5FTime%28proposals%2ElocID%2Cproposals%2Edate%2Cdefault%29+END+AS+locDate%2C+proposals%2EApprdate%2C+proposals%2EApprBy%2C+" +
    "proposals%2EOnHoldDate%2C+proposals%2EOnHoldBy%2C+proposals%2ERejectDate%2C+proposals%2ERejectBy%2C+proposals%2Estatus%2C+description+%3D+" +
    "Rtrim%28proposals%2Edescription%29%2C+proID+%3D+scpro%2Eid%2C+prov+%3D+scpro%2Eshort%5Fname%2C+proposals%2ERequestedBy%2C+proposals%2Ewo%5F%23%2C+" +
    "proposals%2Epo%5F%23%2C+proposals%2Ecomments%2C+proposals%2ESubPro%2C+proposalstyle+%3D+IsNull%28proposals%2EProposalStyle%2C0%29%2C+" +
    "propCurrencyID+%3D+proposals%2Ecurrency%5Fid%2C+invoice%2Einvoice%5Fnumber+invoice%5F%23%2C+priority+%3D+screc%2EprioritySub%2C+" +
    "wostatus+%3D+Upper%28IsNull%28screc%2Ecurrent%5Fstatus%2C%27%27%29%29%2C+screc%2Erecid+%2C++case+when++++++isnull%28Rtrim%28dbo%2EsprContact%2814%2C" +
    "scloc%2Esub%5Fid%2Cscpro%2Eid%2Cscpro%2EE%5Fmail%29%29%2C+%27%27%29+%3C%3E+%27%27++then+%09Rtrim%28dbo%2EsprContact%2814%2Cscloc%2Esub%5Fid%2C" +
    "scpro%2Eid%2Cscpro%2EE%5Fmail%29%29+else+++++tbRFP%2Eproemail+end+proEmail++from+scloc++join+proposals+on+scloc%2Eid+%3D+proposals%2ElocID+left+" +
    "join+xref%5Fwo%5Fproposals+x+on+x%2EproposalID+%3D+proposals%2Eiid+left+join+screc+with%28nolock%29+on+screc%2Erecid+%3D+x%2Etrackingnumber+left+" +
    "join+%28xref%5Fwo%5Finvoices+xr+join+invoice+on+invoice%2Eid+%3D+xr%2Einvoiceid%29+on+xr%2Etrackingnumber+%3D+screc%2Erecid+join+scpro+on+" +
    "scpro%2Eid+%3D+proposals%2Eprovider%5Fid++left+join+tbRFP+with%28nolock%29+on++proposals%2Erfp%5F%23+%3D+tbRFP%2Erfp%5F%23+and+" +
    "tbRFP%2Eprovider%5Fid+%3D+scpro%2Eid+and+tbRFP%2ElocID+%3D+scloc%2Eid+where++proposals%2Estatus+%21%3D+%27VOID%27+and+scloc%2Esub%5Fid+%3D+" +
    "2000051259+AND+proposals%2Edate+%3E%3D+dateadd%28month%2C+%2D1%2C+getdate%28%29%29+and+proposals%2Estatus+in+%28%27open%27%2C+%27On+Hold%27%29+" +
    "order+by+proposals%2Edate+DESC";

    var propFNew1 = "select distinct proposals.UserAssigned, proposals.AssignedTo, proposals.SchedDate, subid = scloc.sub_id, ippid = proposals.iid, proposals.rfp_#, proposals.ExtStatus, scloc.region, scloc.district, site = scloc.store_id, scloc.short_name, scloc.address2, scloc.city, scloc.state, scloc.zip, scloc.country, locID = scloc.id,  trade = IsNull(proposals.trade,''), propNumber = proposals.id, proposals.Amount, proposals.date, CASE WHEN not exists (select top 1 1 from ProposalCategory with (nolock) where Proposal_ID = proposals.iid) THEN proposals.date else dbo.Loc_Time(proposals.locID,proposals.date,default) END AS locDate, proposals.Apprdate, proposals.ApprBy, proposals.OnHoldDate, proposals.OnHoldBy, proposals.RejectDate, proposals.RejectBy, proposals.status, description = Replace(proposals.description,char(13),'<br />'), proID = scpro.id, prov = scpro.short_name, proposals.RequestedBy, proposals.wo_#, proposals.po_#, proposals.comments, proposals.SubPro, proposalstyle = IsNull(proposals.ProposalStyle,0), propCurrencyID = proposals.currency_id, invoice.invoice_number invoice_#, priority = screc.prioritySub, wostatus = Upper(IsNull(screc.current_status,'')), screc.recid ,  case when      isnull(Rtrim(dbo.sprContact(14,scloc.sub_id,scpro.id,scpro.E_mail)), '') <> ''  then 	Rtrim(dbo.sprContact(14,scloc.sub_id,scpro.id,scpro.E_mail)) else     tbRFP.proemail end proEmail  from scloc  join proposals on scloc.id = proposals.locID left join xref_wo_proposals x on x.proposalID = proposals.iid left join screc with(nolock) on screc.recid = x.trackingnumber left join (xref_wo_invoices xr join invoice on invoice.id = xr.invoiceid) on xr.trackingnumber = screc.recid join scpro on scpro.id = proposals.provider_id  left join tbRFP with(nolock) on  proposals.rfp_# = tbRFP.rfp_# and tbRFP.provider_id = scpro.id and tbRFP.locID = scloc.id where  proposals.status != 'VOID' and scloc.sub_id = 2000001305 AND proposals.date >= dateadd(month, -3, getdate()) order by proposals.date DESC";


    /*
        var urlPath = window.location.origin + "/Home/GetLineItemReport";
        var params = {
            'filterExpression': propFNew,
            'locNotes': "123"
        };
        params = JSON.stringify(params);
    
        $.ajax({
            type: 'POST',
            url: urlPath, // the method we are calling
            contentType: 'application/json; charset=utf-8',
            data: params,
            dataType: 'JSON',
            responseType: "application/vnd.ms-excel; charset=utf-8",
            success: function (response) {
                //alert('Yay! It worked!');
                // Or if you are returning something
                var file = new Blob([(response)], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                $window.open(fileURL);
            },
            error: function (data) {
                console.log("Request failed with status: " + data);
                var file = new Blob([(data)], { type: 'application/vnd.ms-excel' });
                var fileURL = URL.createObjectURL(file);
                $window.open(fileURL);
            },
            complete: function () {
                console.log("Request complete with status: ");
            }
        });
    */
    var urlN = window.location.origin + "/Home/GetLineItemReport";
    ajax_download(urlN, { 'filterExpression': propFNew1, 'locNotes': selectedNotes });

    /*
    var $downloadForm = $("<form method='POST'>")
      .attr("action", window.location.origin + "/Home/GetLineItemReport?filterExpression=&locNotes=");
    $downloadForm += "<input type='hidden' name='filterExpression' value='" + propFNew + "'>";
    $downloadForm += "<input type='hidden' name='locNotes' value='" + selectedNotes.toString() + "'>";
    $("body").append($downloadForm);
    $downloadForm.submit();
    $downloadForm.remove();
    */
}