class paginationButtons {
  nextBtn() {
    return cy.get('button[aria-label="Go to next page"]');
  }
  prevBtn() {
    return cy.get('button[aria-label="Go to previous page"]');
  }

  //   checks for regex as using mui classes are unreliable
  contents() {
    return cy
      .get('p.MuiTablePagination-displayedRows')
      .contains(/[0-9]+-[0-9]+\sof\s[0-9]+/);
  }
}

export default paginationButtons;
