const productArr = {
  coffee1: { name: "아메리카노", count: 0, price: 4500 },
  coffee2: { name: "카페라떼", count: 0, price: 5000 },
  coffee3: { name: "돌체라떼", count: 0, price: 5900 },
  coffee4: { name: "카푸치노", count: 0, price: 5000 },
  coffee5: { name: "에스프레소", count: 0, price: 4000 },
  coffee6: { name: "에스프레소 마끼아또", count: 0, price: 4000 },
  coffee7: { name: "카라멜 마끼아또", count: 0, price: 5900 },
  coffee8: { name: "카페모카", count: 0, price: 5500 },
};

function orderList(productName, productPrice) {
  $.each(productArr, function (index, item) {
    if (productName == item.name) {
      if (item.count == 0) {
        item.count = countPlus(item.count);
        let tempStringS = `
                <section>
                <span class="product-name">${productName}</span>
                <div class="list-count-btn" id="${index}">
                <span id="minusBtn" class="${index}-minus-btn">-</span>
                <span class="product-count">${item.count}</span>
                <span id="plusBtn" class="${index}-plus-btn">+</span>
                        </div>
                        <div class="product-price" id="${index}">
                        `;
        tempStringS += `<span class="product-total-price">`;
        tempStringS += commaFunc(productPrice) + "</span>";

        tempStringS += `
                        <span>원</span>
                        <span id="delBtn" class="${index}-coffee-del-btn">X</span>
                        </div>
                        </section>
                        `;
        $(".list-product").append(tempStringS);
        console.log(tempStringS);
      } else if (item.count > 0) {
        this.count = countPlus(this.count);

        //계산한걸 담기
        let productPriceT = orderPrice(item.count, item.price);

        //증가한걸넣기
        $("#" + index + ">.product-count").html(this.count);
        $("#" + index + "+ div > .product-total-price").html(
          commaFunc(productPriceT)
        );
      }
    }
  });
  totalCountFunc();
  totalPriceFunc();
}

function plusMinusFunc(eID, thisId, targetCN) {
  switch (eID) {
    case "plusBtn":
      $.each(productArr, function (index, item) {
        if (index == thisId) {
          this.count = countPlus(this.count);
          let productPriceT = orderPrice(item.count, item.price);
          $("#" + index + ">.product-count").html(this.count);
          $("#" + index + "+ div > .product-total-price").html(
            commaFunc(productPriceT)
          );
        }
      });
      break;

    case "minusBtn":
      $.each(productArr, function (index, item) {
        if (index == thisId) {
          if (this.count > 1) {
            this.count = countMinu(this.count);
            let productPriceT = orderPrice(item.count, item.price);

            $("#" + index + ">.product-count").html(this.count);
            $("#" + index + "+ div > .product-total-price").html(
              commaFunc(productPriceT)
            );
          } else {
            this.count = countMinu(this.count);

            $("." + targetCN)
              .parent()
              .parent()
              .remove();
          }
        }
      });
      break;

    case "delBtn":
      $.each(productArr, function (index, item) {
        if (index == thisId) {
          this.count = delCount(this.count);
          let productPriceT = orderPrice(item.count, item.price);
          console.log(targetCN);
          $("." + targetCN)
            .parent()
            .parent()
            .remove();
        }
      });
      break;
  }
  totalCountFunc();
  totalPriceFunc();
}

function countPlus(count) {
  count++;
  return count;
}

function countMinu(count) {
  count--;
  return count;
}

function delCount(count) {
  count = 0;
  return count;
}

function orderPrice(count, price) {
  orderpay = count * price;
  return orderpay;
}

function commaFunc(target_number) {
  let temp_target = String(target_number);
  let comma_regex = /\B(?=(\d{3})+(?!\d))/g;
  return temp_target.replace(comma_regex, ",");
}

function stringNumberToInt(stringNumber) {
  return parseInt(stringNumber.replace(/,/g, ""));
}

function totalCountFunc() {
  let productCountClass = document.getElementsByClassName("product-count");
  let tempF = [];
  for (let i = 0; i < productCountClass.length; i++) {
    tempF.push(parseInt(productCountClass[i].innerHTML));
  }
  if (tempF != 0) {
    const totalCount = tempF.reduce((a, b) => a + b);
    $(".total-count").html(totalCount);
  } else if (tempF == 0) {
    $(".total-count").html(0);
  }
}

function totalPriceFunc() {
  let productTotalPriceClass = document.getElementsByClassName(
    "product-total-price"
  );
  let tempF = [];
  for (let i = 0; i < productTotalPriceClass.length; i++) {
    tempF.push(stringNumberToInt(productTotalPriceClass[i].innerHTML));
  }
  if (tempF != 0) {
    const totalPrice = tempF.reduce((a, b) => a + b);
    $(".total-price").html(commaFunc(totalPrice));
  } else if (tempF == 0) {
    $(".total-price").html(0);
  }
  $(".totalAmount").val(stringNumberToInt($(".total-price").html()));
}

$(function () {
  $(".click-event").on("click", function () {
    let productName = $(this)
      .children(".coffee-img + li")
      .children("span")
      .html();
    let productPrice = $(this)
      .children(".coffee-img + li")
      .next("li")
      .children("span")
      .html();
    console.log(productPrice);

    orderList(productName, productPrice);
  });

  $(document).on("click", function (e) {
    if (
      e.target.id == "plusBtn" ||
      e.target.id == "minusBtn" ||
      e.target.id == "delBtn"
    ) {
      let targetCN = e.target.className;
      let thisId = $("." + targetCN)
        .parent()
        .attr("id");
      plusMinusFunc(e.target.id, thisId, targetCN);
    }
  });
});
