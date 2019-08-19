# sfi-calculations

## PROTO TODO
* Three buttons for data pages (Nematode, Filamentous and Protozoa, Bacteria) - DONE
* Filamentous and Protozoa Page
  * Three different views for each organism subgroup
    * Summary - shows reading totals for each organism (similar to old spreadsheet) - DONE
    * Reading - Shows Field totals for each reading (similar to lukes spreadsheet) - DONE
    * Field - Shows measurements for a single field (plus fungi/oomycete special stuff from lukes spreadsheet)
      * This is basically the data entry view and allows users for focus on a single field for fast data entry
      * Save button does calculations and adds total to the Reading/Summary Views
    * expand/collapse button for to navigate to each view - DONE
  * Add Field button adds a field to all readings - DONE
  * Show real-time Mean and StDev biomass calcs (big gray and green columns)

## TODO
* sample name, client name to sample information
  * Name -> Client Name
  * add Sample ID
  * Type -> Sample Type
* autopopulate fields per reading with number of fields input on the reading tab
* number of fields in subsequent readings must be the same as the number of fields in the first reading
  * hide additional unused field rows so that only the number of needed fields are shown
  * validate readings such that they must have the correct number of fields
  * number of fields is determined as they go on reading #1
* report sheet range should come from sucession ranges tab
* print formatting 
* report range auto selections
* formula popups
  * mean result
  * stdev result
  * all bacteria
* import/export
