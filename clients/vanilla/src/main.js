import tigerFactory, {
  TigerTokenAuthProvider,
} from "@gooddata/sdk-backend-tiger";
import { MeasureGroupIdentifier, newDimension } from "@gooddata/sdk-model";
import * as md from "./export";
import Chart from "chart.js/auto";

async function getDataFromGoodData() {
  let data;

  try {
    const backend = tigerFactory({
      hostname: "<GOODDATA-HOST>",
    }).withAuthentication(new TigerTokenAuthProvider("<GOODDATA-TOKEN>"));
    const measuresAndAttributes = [md.Rating.Avg, md.ProductCategory];

    const dimensions = newDimension([
      md.ProductCategory,
      MeasureGroupIdentifier,
    ]);

    const result = await backend
      .workspace("0579b875d9e341189bb8f5a55bdd9a27")
      .execution()
      .forItems(measuresAndAttributes)
      .withDimensions(dimensions)
      .execute();

    data = await result.readAll();
  } catch (err) {
    console.log(err);
  }

  return data;
}

(async function () {
  const ctx = document.getElementById("chart");
  const { data, headerItems } = await getDataFromGoodData();
  const labels = headerItems[0][0].map((item) => item.attributeHeaderItem.name);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Avg Ratings",
          data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
})();
