
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Allocations overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="New Allocations added"
          dateTime="29 AUG 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="Inventory updated"
          dateTime="29 AUG 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="New Categories Added"
          dateTime="29 AUG 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="System Optimized"
          dateTime="29 AUG 2:20 AM"
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
