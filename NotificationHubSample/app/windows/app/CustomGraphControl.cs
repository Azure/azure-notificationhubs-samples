using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace app
{
    public sealed class CustomGraphControl : Control, INotifyPropertyChanged
    {
        public static DependencyProperty LabelProperty { get; private set; }
        public static DependencyProperty DataProperty { get; private set; }

        public string Label
        {
            get
            {
                return (string)GetValue(LabelProperty);
            }
            set
            {
                SetValue(LabelProperty, value);
            }
        }

        public string Data
        {
            get
            {
                return (string)GetValue(DataProperty);
            }
            set
            {
                SetValue(DataProperty, value);
            }
        }

        private ObservableCollection<DataItem> _dataSet;
        public ObservableCollection<DataItem> DataSet
        {
            get
            {
                return _dataSet;
            }
            set
            {
                _dataSet = value;
                OnPropertyChanged();
            }
        }

        static CustomGraphControl()
        {
            LabelProperty = DependencyProperty.Register(
                nameof(Label),
                typeof(string),
                typeof(CustomGraphControl),
                new PropertyMetadata(default(string))
                );

            DataProperty = DependencyProperty.Register(
                nameof(Data),
                typeof(string),
                typeof(CustomGraphControl),
                new PropertyMetadata(default(string))
                );
        }

        public CustomGraphControl()
        {
            DefaultStyleKey = typeof(CustomGraphControl);

            _dataSet = new ObservableCollection<DataItem>()
            {
                new DataItem() { Timestamp="D1", NotificationsSent=120 },
                new DataItem() { Timestamp="D2", NotificationsSent=140 },
                new DataItem() { Timestamp="D3", NotificationsSent=100 },
                new DataItem() { Timestamp="D4", NotificationsSent=80 },
                new DataItem() { Timestamp="D5", NotificationsSent=180 },
                new DataItem() { Timestamp="D6", NotificationsSent=160 },
            };
        }

        public event PropertyChangedEventHandler PropertyChanged;

        // Create the OnPropertyChanged method to raise the event
        // The calling member's name will be used as the parameter.
        private void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }

    public class DataItem
    {
        public string Timestamp { get; set; }
        public int NotificationsSent { get; set; }
    }
}
