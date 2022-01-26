----------------------------이 줄 아래 부터 복사해가세요----------------------------

function get_detail() {

    $.ajax({

        // HTTP 메서드 지정

        type: "GET",

        // 요청 보낼 주소 지정

        url: `/api/goods/${goodsId}`,

        // 함께 보낼 데이터 (없으면 빈 객체)

        data: {},

        // 에러 검증(아래의 경우 status가 404라면 없는 상품이니까 에러)

        // 에러가 맞다면 어떻게 할지 작성

        error: function (xhr, status, error) {

            if (status == 404) {

                alert("존재하지 않는 상품입니다.");

            }

            window.location.href = "/goods";

        },

        // 에러가 아니라면 -> 성공. 성공해서 데이터를 받아왔으니 데이터로 무슨 행동을 할지 작성

        success: function (response) {

            let goodsDetail = response["detail"];

            $("#goodsUrl").attr("src", goodsDetail["thumbnailUrl"]);

            $("#goodsName").text(goodsDetail["name"]);

            $("#goodsPrice").text("$" + number2decimals(goodsDetail["price"]));

            sessionStorage.setItem("goodsId", goodsId);

            sessionStorage.setItem("goodsName", goodsDetail["name"]);

            sessionStorage.setItem("goodsPrice", goodsDetail["price"]);

            sessionStorage.setItem("orderNum", 1);

        }

    });

}



function addCart() {

    $.ajax({

        type: "POST",

        url: `/api/goods/${goodsId}/cart`,

        // 위의 경우와 다르게 함께 보낼 데이터가 필요하니까 data가 빈 객체가 아님

        data: {

            quantity: sessionStorage.getItem("orderNum")

        },

        error: function (xhr, status, error) {

            if (status == 400) {

                alert("존재하지 않는 상품입니다.");

            }

            window.location.href = "/goods";

        },

        success: function (response) {

            if (response["result"] == "success") {

                $("#cartModal").modal("show");

            }

        }

    });

}