﻿var state = { isNewBeingCreated : false };
function change() {
   var opt = $("#selectID option:selected");
   alert(opt.attr("value"));
}
function makeNewRes() {
   //$("#table_id tbody").prepend('<tr role="row" class="odd">      <td class="sorting_1"></td>      <td contenteditable="true">&nbsp;</td>      <td></td>      <td></td>      <td></td>      <td></td>     </tr>');
   
   if (!state.isNewBeingCreated) {
      var tr = $('<tr id="#newItem" role="row" class="odd">      <td class="sorting_1"></td>      <td contenteditable="true">&nbsp;</td>      <td></td>      <td></td>      <td></td>      <td></td>     </tr>');
      tr.click(ifRowClicked);
      tr.addClass("newRes");
      var arry = tr.children();
      for (var i = 0; i < arry.length; i++) {
         var d = $(arry[i]);
         d.attr("contentEditable", true);
         d.addClass("newCellRes");
      }
      $("table#marketTable tbody").prepend(tr);
      state.isNewBeingCreated = true;
        
   }
}
var ifRowClicked = function (e) {
   e.stopPropagation();
}
var ifBodyClicked = function () {
   var toPost = $(".newRes");
   var toEdit = $(".editedRes");
   if (toPost.length > 0) {
      $.post("/createReservation", function (data) {
         //if(data is not bad)
         //alert(data);
         state.isNewBeingCreated = true;
      });
   } else if (toEdit.length > 0) {
           // do stuff
           //state of edited row should be turned to false
   }
      
}
     




/*
  marketTable.find("tbody tr:odd").css({ "background-color" : "#EBFAF7" });     
  marketTable.find("tbody tr:even").css({ "background-color" : "#E3EEEC" });
   marketTable.find("tbody tr").mouseover(function () {
      $(this).css({ "-webkit-filter": "brightness(90%)" });
   });
   marketTable.find("tbody tr").mouseout(function () {
      $(this).css({ "-webkit-filter": "brightness(100%)" });
   });
*/


//$("#tableID").html('   <table id="table_id" class="display" cellspacing="0" width="100%">    <thead>     <tr>      <th>Restaurant</th>      <th>Date</th>      <th>Time</th>      <th>Guests</th>      <th>Name</th>      <th>EmptyEmpty</th>     </tr>    </thead>    <tfoot>     <tr>      <th>Name</th>      <th>Position</th>      <th>Office</th>      <th>Age</th>      <th>Startdate</th>      <th>Salary</th>     </tr>    </tfoot>    <tbody>     <tr>      <td>TigerNixon</td>      <td>SystemArchitect</td>      <td>Edinburgh</td>      <td>61</td>      <td>2011/04/25</td>      <td>$320,800</td>     </tr>     <tr>      <td>GarrettWinters</td>      <td>Accountant</td>      <td>Tokyo</td>      <td>63</td>      <td>2011/07/25</td>      <td>$170,750</td>     </tr>     <tr>      <td>AshtonCox</td>      <td>JuniorTechnicalAuthor</td>      <td>SanFrancisco</td>      <td>66</td>      <td>2009/01/12</td>      <td>$86,000</td>     </tr>     <tr>      <td>CedricKelly</td>      <td>SeniorJavascriptDeveloper</td>      <td>Edinburgh</td>      <td>22</td>      <td>2012/03/29</td>      <td>$433,060</td>     </tr>     <tr>      <td>AiriSatou</td>      <td>Accountant</td>      <td>Tokyo</td>      <td>33</td>      <td>2008/11/28</td>      <td>$162,700</td>     </tr>     <tr>      <td>BrielleWilliamson</td>      <td>IntegrationSpecialist</td>      <td>NewYork</td>      <td>61</td>      <td>2012/12/02</td>      <td>$372,000</td>     </tr>     <tr>      <td>HerrodChandler</td>      <td>SalesAssistant</td>      <td>SanFrancisco</td>      <td>59</td>      <td>2012/08/06</td>      <td>$137,500</td>     </tr>     <tr>      <td>RhonaDavidson</td>      <td>IntegrationSpecialist</td>      <td>Tokyo</td>      <td>55</td>      <td>2010/10/14</td>      <td>$327,900</td>     </tr>     <tr>      <td>ColleenHurst</td>      <td>JavascriptDeveloper</td>      <td>SanFrancisco</td>      <td>39</td>      <td>2009/09/15</td>      <td>$205,500</td>     </tr>     <tr>      <td>SonyaFrost</td>      <td>SoftwareEngineer</td>      <td>Edinburgh</td>      <td>23</td>      <td>2008/12/13</td>      <td>$103,600</td>     </tr>     <tr>      <td>JenaGaines</td>      <td>OfficeManager</td>      <td>London</td>      <td>30</td>      <td>2008/12/19</td>      <td>$90,560</td>     </tr>     <tr>      <td>QuinnFlynn</td>      <td>SupportLead</td>      <td>Edinburgh</td>      <td>22</td>      <td>2013/03/03</td>      <td>$342,000</td>     </tr>     <tr>      <td>ChardeMarshall</td>      <td>RegionalDirector</td>      <td>SanFrancisco</td>      <td>36</td>      <td>2008/10/16</td>      <td>$470,600</td>     </tr>     <tr>      <td>HaleyKennedy</td>      <td>SeniorMarketingDesigner</td>      <td>London</td>      <td>43</td>      <td>2012/12/18</td>      <td>$313,500</td>     </tr>     <tr>      <td>TatyanaFitzpatrick</td>      <td>RegionalDirector</td>      <td>London</td>      <td>19</td>      <td>2010/03/17</td>      <td>$385,750</td>     </tr>     <tr>      <td>MichaelSilva</td>      <td>MarketingDesigner</td>      <td>London</td>      <td>66</td>      <td>2012/11/27</td>      <td>$198,500</td>     </tr>     <tr>      <td>PaulByrd</td>      <td>ChiefFinancialOfficer(CFO)</td>      <td>NewYork</td>      <td>64</td>      <td>2010/06/09</td>      <td>$725,000</td>     </tr>     <tr>      <td>GloriaLittle</td>      <td>SystemsAdministrator</td>      <td>NewYork</td>      <td>59</td>      <td>2009/04/10</td>      <td>$237,500</td>     </tr>     <tr>      <td>BradleyGreer</td>      <td>SoftwareEngineer</td>      <td>London</td>      <td>41</td>      <td>2012/10/13</td>      <td>$132,000</td>     </tr>     <tr>      <td>DaiRios</td>      <td>PersonnelLead</td>      <td>Edinburgh</td>      <td>35</td>      <td>2012/09/26</td>      <td>$217,500</td>     </tr>     <tr>      <td>JenetteCaldwell</td>      <td>DevelopmentLead</td>      <td>NewYork</td>      <td>30</td>      <td>2011/09/03</td>      <td>$345,000</td>     </tr>     <tr>      <td>YuriBerry</td>      <td>ChiefMarketingOfficer(CMO)</td>      <td>NewYork</td>      <td>40</td>      <td>2009/06/25</td>      <td>$675,000</td>     </tr>     <tr>      <td>CaesarVance</td>      <td>Pre-SalesSupport</td>      <td>NewYork</td>      <td>21</td>      <td>2011/12/12</td>      <td>$106,450</td>     </tr>     <tr>      <td>DorisWilder</td>      <td>SalesAssistant</td>      <td>Sidney</td>      <td>23</td>      <td>2010/09/20</td>      <td>$85,600</td>     </tr>     <tr>      <td>AngelicaRamos</td>      <td>ChiefExecutiveOfficer(CEO)</td>      <td>London</td>      <td>47</td>      <td>2009/10/09</td>      <td>$1,200,000</td>     </tr>     <tr>      <td>GavinJoyce</td>      <td>Developer</td>      <td>Edinburgh</td>      <td>42</td>      <td>2010/12/22</td>      <td>$92,575</td>     </tr>     <tr>      <td>JenniferChang</td>      <td>RegionalDirector</td>      <td>Singapore</td>      <td>28</td>      <td>2010/11/14</td>      <td>$357,650</td>     </tr>     <tr>      <td>BrendenWagner</td>      <td>SoftwareEngineer</td>      <td>SanFrancisco</td>      <td>28</td>      <td>2011/06/07</td>      <td>$206,850</td>     </tr>     <tr>      <td>FionaGreen</td>      <td>ChiefOperatingOfficer(COO)</td>      <td>SanFrancisco</td>      <td>48</td>      <td>2010/03/11</td>      <td>$850,000</td>     </tr>     <tr>      <td>ShouItou</td>      <td>RegionalMarketing</td>      <td>Tokyo</td>      <td>20</td>      <td>2011/08/14</td>      <td>$163,000</td>     </tr>     <tr>      <td>MichelleHouse</td>      <td>IntegrationSpecialist</td>      <td>Sidney</td>      <td>37</td>      <td>2011/06/02</td>      <td>$95,400</td>     </tr>     <tr>      <td>SukiBurks</td>      <td>Developer</td>      <td>London</td>      <td>53</td>      <td>2009/10/22</td>      <td>$114,500</td>     </tr>     <tr>      <td>PrescottBartlett</td>      <td>TechnicalAuthor</td>      <td>London</td>      <td>27</td>      <td>2011/05/07</td>      <td>$145,000</td>     </tr>     <tr>      <td>GavinCortez</td>      <td>TeamLeader</td>      <td>SanFrancisco</td>      <td>22</td>      <td>2008/10/26</td>      <td>$235,500</td>     </tr>     <tr>      <td>MartenaMccray</td>      <td>Post-Salessupport</td>      <td>Edinburgh</td>      <td>46</td>      <td>2011/03/09</td>      <td>$324,050</td>     </tr>     <tr>      <td>UnityButler</td>      <td>MarketingDesigner</td>      <td>SanFrancisco</td>      <td>47</td>      <td>2009/12/09</td>      <td>$85,675</td>     </tr>     <tr>      <td>HowardHatfield</td>      <td>OfficeManager</td>      <td>SanFrancisco</td>      <td>51</td>      <td>2008/12/16</td>      <td>$164,500</td>     </tr>     <tr>      <td>HopeFuentes</td>      <td>Secretary</td>      <td>SanFrancisco</td>      <td>41</td>      <td>2010/02/12</td>      <td>$109,850</td>     </tr>     <tr>      <td>VivianHarrell</td>      <td>FinancialController</td>      <td>SanFrancisco</td>      <td>62</td>      <td>2009/02/14</td>      <td>$452,500</td>     </tr>     <tr>      <td>TimothyMooney</td>      <td>OfficeManager</td>      <td>London</td>      <td>37</td>      <td>2008/12/11</td>      <td>$136,200</td>     </tr>     <tr>      <td>JacksonBradshaw</td>      <td>Director</td>      <td>NewYork</td>      <td>65</td>      <td>2008/09/26</td>      <td>$645,750</td>     </tr>     <tr>      <td>OliviaLiang</td>      <td>SupportEngineer</td>      <td>Singapore</td>      <td>64</td>      <td>2011/02/03</td>      <td>$234,500</td>     </tr>     <tr>      <td>BrunoNash</td>      <td>SoftwareEngineer</td>      <td>London</td>      <td>38</td>      <td>2011/05/03</td>      <td>$163,500</td>     </tr>     <tr>      <td>SakuraYamamoto</td>      <td>SupportEngineer</td>      <td>Tokyo</td>      <td>37</td>      <td>2009/08/19</td>      <td>$139,575</td>     </tr>     <tr>      <td>ThorWalton</td>      <td>Developer</td>      <td>NewYork</td>      <td>61</td>      <td>2013/08/11</td>      <td>$98,540</td>     </tr>     <tr>      <td>FinnCamacho</td>      <td>SupportEngineer</td>      <td>SanFrancisco</td>      <td>47</td>      <td>2009/07/07</td>      <td>$87,500</td>     </tr>     <tr>      <td>SergeBaldwin</td>      <td>DataCoordinator</td>      <td>Singapore</td>      <td>64</td>      <td>2012/04/09</td>      <td>$138,575</td>     </tr>     <tr>      <td>ZenaidaFrank</td>      <td>SoftwareEngineer</td>      <td>NewYork</td>      <td>63</td>      <td>2010/01/04</td>      <td>$125,250</td>     </tr>     <tr>      <td>ZoritaSerrano</td>      <td>SoftwareEngineer</td>      <td>SanFrancisco</td>      <td>56</td>      <td>2012/06/01</td>      <td>$115,000</td>     </tr>     <tr>      <td>JenniferAcosta</td>      <td>JuniorJavascriptDeveloper</td>      <td>Edinburgh</td>      <td>43</td>      <td>2013/02/01</td>      <td>$75,650</td>     </tr>     <tr>      <td>CaraStevens</td>      <td>SalesAssistant</td>      <td>NewYork</td>      <td>46</td>      <td>2011/12/06</td>      <td>$145,600</td>     </tr>     <tr>      <td>HermioneButler</td>      <td>RegionalDirector</td>      <td>London</td>      <td>47</td>      <td>2011/03/21</td>      <td>$356,250</td>     </tr>     <tr>      <td>LaelGreer</td>      <td>SystemsAdministrator</td>      <td>London</td>      <td>21</td>      <td>2009/02/27</td>      <td>$103,500</td>     </tr>     <tr>      <td>JonasAlexander</td>      <td>Developer</td>      <td>SanFrancisco</td>      <td>30</td>      <td>2010/07/14</td>      <td>$86,500</td>     </tr>     <tr>      <td>ShadDecker</td>      <td>RegionalDirector</td>      <td>Edinburgh</td>      <td>51</td>      <td>2008/11/13</td>      <td>$183,000</td>     </tr>     <tr>      <td>MichaelBruce</td>      <td>JavascriptDeveloper</td>      <td>Singapore</td>      <td>29</td>      <td>2011/06/27</td>      <td>$183,000</td>     </tr>     <tr>      <td>DonnaSnider</td>      <td>CustomerSupport</td>      <td>NewYork</td>      <td>27</td>      <td>2011/01/25</td>      <td>$112,000</td>     </tr>    </tbody>   </table>     ');
//$("#table_id").dataTable();



var tr = $('<tr id="#newItem" role="row" class="odd">      <td class="sorting_1"></td>      <td contenteditable="true">&nbsp;</td>      <td></td>      <td></td>      <td></td>      <td></td>     </tr>');