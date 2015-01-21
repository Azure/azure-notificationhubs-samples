using System;
using System.Collections.Generic;
using Microsoft.Office.Interop.Excel;

namespace NHTelemetrySpreadsheet
{
    public partial class Metadata
    {
        const string SHEET_NAME_CHART = "TelemetryChart";
        const string SHEET_NAME_METADATA = "Metadata";
        const string SHEET_NAME_TELEMETRYDATA = "TelemetryData";

        #region VSTO Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InternalStartup()
        {
            this.btnFetchMetrics.Click += new System.EventHandler(this.btnFetchMetrics_Click);
            this.datePickerFromDate.Value = this.datePickerToDate.Value.AddDays(-7);
            this.cmbMetricRollup.SelectedIndex = 0;
            this.lstMetricName.SetItemChecked(0, true);
            ((Worksheet)this.Application.ActiveWorkbook.Sheets.get_Item(SHEET_NAME_METADATA)).Activate();
        }

        #endregion

        private void btnFetchMetrics_Click(object sender, EventArgs e)
        {
            int metricSelection = 1;
            UpdateSpreadsheetHeaders();
            foreach (string selectedItem in lstMetricName.CheckedItems)
            {
                TelemetryInputs inputs = GetMetadataInputs(ParseMetricName(selectedItem));
                Dictionary<DateTime, long> allTelemetryData = PopulateValues(inputs);
                List<Telemetry> fetchedTelemetryData = NHTelemetry.GetTelemetryData(inputs);
                WriteToSpreadsheet(allTelemetryData, fetchedTelemetryData, inputs, metricSelection);
                metricSelection++;
            }
            CreateChart();
        }

        private void UpdateSpreadsheetHeaders()
        {
            Worksheet sheet = ((Worksheet)this.Application.ActiveWorkbook.
                Sheets.get_Item(SHEET_NAME_TELEMETRYDATA));
            sheet.Activate();
            ClearWorkSheet(sheet);

            sheet.Range["A1"].Value = "Timestamp";
            int colCount = 2;
            foreach (string selectedItem in lstMetricName.CheckedItems)
            {
                ((Range)sheet.Cells[1, colCount++]).Value = (selectedItem.Split('(')[0]).Trim();
            }
            sheet.Range["1:1"].Font.Bold = true;
            sheet.get_Range("A1").EntireRow.EntireColumn.AutoFit();
        }

        private void ClearWorkSheet(Worksheet sheet)
        {
            sheet.get_Range("A1").EntireRow.EntireColumn.Clear();
        }

        private TelemetryInputs GetMetadataInputs(string metricName)
        {
            TelemetryInputs inputs = new TelemetryInputs();
            inputs.PathToCert = txtCertPath.Text.Trim();
            inputs.CertPassword = txtCertPassword.Text.Trim();
            inputs.SubscriptionId = txtSubscriptionID.Text.Trim(); 
            inputs.NamespaceName = txtNamespace.Text.Trim();
            inputs.NotificationHubName = txtNotificationHub.Text.Trim();
            inputs.MetricName = metricName;
            inputs.FromDate = datePickerFromDate.Value.Date;
            inputs.ToDate = datePickerToDate.Value.Date;
            inputs.Rollup = ParseMetricRollup();
            return inputs;
        }

        private string ParseMetricName(string selectedItem)
        {
            return (selectedItem.Split('(')[1]).TrimEnd(')');
        }

        private TelemetryRollups ParseMetricRollup()
        {
            TelemetryRollups returnVal;
            if (cmbMetricRollup.SelectedItem != null)
            {
                string selectedRollup = (cmbMetricRollup.SelectedItem.ToString().Split('(')[1]).TrimEnd(')');
                returnVal = (TelemetryRollups)Enum.Parse(typeof(TelemetryRollups), selectedRollup);
            }
            else
            {
                //Default
                returnVal = TelemetryRollups.P1D;       
            }
            return returnVal;
        }

        private Dictionary<DateTime, long> PopulateValues(TelemetryInputs inputs)
        {
            Dictionary<DateTime, long> values = new Dictionary<DateTime, long>(); 
            DateTime currentDT = inputs.FromDate;
            while (currentDT <= inputs.ToDate)
            {
                values.Add(currentDT, 0);
                currentDT = UpdateIteratingDateTime(currentDT, inputs);
            }
            return values;
        }

        private void WriteToSpreadsheet(Dictionary<DateTime, long> allTelemetryData,
            List<Telemetry> fetchedTelemetryData, TelemetryInputs inputs, int selectionNumber)
        {
            int columnNumber = selectionNumber + 1;
            foreach (Telemetry item in fetchedTelemetryData)
            {
                allTelemetryData[item.TimeStamp] = item.Value;
            }
            
            DateTime currentDT = inputs.FromDate;
            int rowCount = 2;
            while (currentDT <= inputs.ToDate)
            {
                UpdateInSpreadsheet(currentDT, allTelemetryData[currentDT].ToString(), rowCount, columnNumber);
                rowCount++;
                currentDT = UpdateIteratingDateTime(currentDT, inputs);
            }
        }

        private void UpdateInSpreadsheet(DateTime currentDT, string value, int rowCount, int colCount)
        {
            Worksheet sheet = Application.ActiveWorkbook.Sheets.get_Item(SHEET_NAME_TELEMETRYDATA);
            
            if (colCount == 2)
            {
                // Update DateTime only the first time
                sheet.Range["A" + rowCount].Value = currentDT;
            }
            else
            { 
                // from next time onwards just verify that the correct DateTime is present
                //  against which we will be adding the values
                if (sheet.Range["A" + rowCount].Value != currentDT)
                {
                    throw new InvalidOperationException("Values do not match");
                }
            }

            // Update value
            Range rng = (Range)sheet.Cells[rowCount, colCount];
            rng.Value = value;
        }

        private DateTime UpdateIteratingDateTime(DateTime currentDT, TelemetryInputs inputs)
        {
            DateTime updatedDT = currentDT;
            switch (inputs.Rollup)
            {
                case TelemetryRollups.P1D: 
                    updatedDT = currentDT.AddDays(1);
                    break;
                case TelemetryRollups.PT1H:
                    updatedDT = currentDT.AddHours(1);
                    break;
                case TelemetryRollups.PT5M:
                    updatedDT = currentDT.AddMinutes(5);
                    break;
            }
            return updatedDT;
        }

        private void CreateChart()
        {
            var charts = this.Application.ActiveWorkbook.Charts;
            // Clean up the old chart since we are regenerating data
            if (charts.Count >= 1)
            {
                Application.DisplayAlerts = false;
                ((Chart)(this.Application.ActiveWorkbook.Charts.get_Item(SHEET_NAME_CHART))).Delete();
                Application.DisplayAlerts = true;
            }
            var newChart = (Chart)this.Application.ActiveWorkbook.Charts.Add();
            newChart.Name = SHEET_NAME_CHART;
            newChart.ChartType = XlChartType.xlXYScatterLines;
        }
    }
}